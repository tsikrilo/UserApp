import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserDetailService } from '../shared/user-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserTitle } from '../shared/user-title.model';
import { IUserType } from '../shared/user-type.model';
import { IUserDetail } from '../shared/user-detail.model';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styles: []
})
// TODO each component should have it's own folder
export class UserDetailsComponent implements OnInit {
  // TODO remove unused properties
  form: NgForm;
  buttonText: string;
  userId: number;
  userModel: IUserDetail | undefined;
  users: IUserDetail[];
  userTitleList: IUserTitle[];
  userTypeList: IUserType[];
  pageTitle = 'User Details';

  userDetail: IUserDetail;

  loading: boolean = false;
  // TODO where is this shown?
  errorMessage;

  constructor(public userDetailService: UserDetailService,
              private router: Router,
              private route: ActivatedRoute,
              private notifyService: NotificationService) {
  }

  ngOnInit(): void {

    this.userId = +this.route.snapshot.paramMap.get('id');

    if (this.userId == 0) {
      this.resetForm();
    }
    this.userDetailService.getUser(this.userId).subscribe({
      next: users => {
        this.userModel = users;
      },
      error: err => this.errorMessage = err
    });

    this.userDetailService.getUserTitleList().subscribe({
      next: userTitles => {
        this.userTitleList = userTitles
      },
      error: err => this.errorMessage = err
    });

    this.userDetailService.getUserTypeList().subscribe({
      next: userTypes => {
        this.userTypeList = userTypes
      },
      error: err => this.errorMessage = err
    });

    this.userDetailService.getUserList().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err
    });
  }

  onSubmit(form: NgForm) {
    if (this.userDetailService.userDetail.Id == 0) {
      this.registerUser(form);
    } else {
      this.updateUserDetails(form);
    }
    form.form.reset();
  }

  resetForm() {
    this.userDetailService.userDetail = {
      Id: 0,
      Name: '',
      Surname: '',
      BirthDate: new Date,
      UserTitleId: 0,
      UserTypeId: 0,
      EmailAddress: '',
      IsActive: true
    }
  }

  registerUser(form: NgForm) {
    this.userDetailService.postUserDetail().subscribe(
      res => {
        this.notifyService.showSuccess("User created successfully !!", "CREATE USER");
        //this.userDetailService.getUserList();
        // TODO this is wrong. Do NOT set timeouts. Missing the point of observables
        setTimeout(() => {
            this.router.navigate(['/users'])
              .then(() => {
                window.location.reload();
              });
          },
          2000);
      },
      err => {
        console.log(err);
      }
    )
  }

  updateUserDetails(form: NgForm) {
    this.userDetailService.putUserDetail().subscribe(
      res => {
        this.resetForm();
        this.notifyService.showSuccess("User data updated successfully !!", "UPDATE USER");
        //this.userDetailService.getUserList();
        setTimeout(() => {
            this.router.navigate(['/users'])
              .then(() => {
                window.location.reload();
              });
          },
          2000);
      },
      err => {
        this.notifyService.showError("Something went wrong", "UPDATE")
        console.log(err);
      }
    )

  }
}
