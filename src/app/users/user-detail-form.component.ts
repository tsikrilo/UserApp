import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserDetailService } from '../shared/user-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from 'src/app/shared/user-detail.model';
import { UserTitle } from '../shared/user-title.model';
import { UserType } from '../shared/user-type.model';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styles: [
  ]
})
export class UserDetailsComponent implements OnInit {
  form: NgForm;
  buttonText : string;
  userId: number;
  userModel: UserDetail;
  users: UserDetail[];
  userTitleList: UserTitle[];
  userTypeList: UserType[];
  pageTitle= 'User Details';

  userDetail: UserDetail;
 
  loading: boolean = false;
  errorMessage;

  constructor(public userDetailService: UserDetailService, 
              private router: Router,
              private route: ActivatedRoute) { 
  }

  ngOnInit(): void { 
      
    this.userId = +this.route.snapshot.paramMap.get('id');
   
    if(this.userId == 0){  this.resetForm();}
    this.userDetailService.getUser(this.userId).subscribe({
        next : users =>
        {
            this.userModel = users;
        },
        error: err => this.errorMessage = err
      });

    this.userDetailService.getUserTitleList().subscribe({
        next: userTitles =>
        {
          this.userTitleList = userTitles
        },
        error : err => this.errorMessage = err 
      });

    this.userDetailService.getUserTypeList().subscribe({
        next: userTypes =>
        {
          this.userTypeList = userTypes
        },
        error: err => this.errorMessage = err     
      }); 

      this.userDetailService.getUserList().subscribe({
        next : users =>
        {
              this.users = users;
        },
        error: err => this.errorMessage = err    
    });
  }

  onSubmit(form: NgForm){
    if(this.userDetailService.userModel.Id == 0){
      this.registerUser(form);
    }else{
      this.updateUserDetails(form);
    }    
    form.form.reset(); 
  }

  resetForm(){
      this.userDetailService.userModel = {
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

  registerUser(form: NgForm){
    this.userDetailService.postUserDetail().subscribe(
      res => {
        this.userDetailService.getUserList();
      },
      err => {console.log(err);}
    )      
  }

  updateUserDetails(form: NgForm){
    this.userDetailService.putUserDetail().subscribe(
      res => {
        this.resetForm();
        //this.toastr.info('Submitted successfully', 'Payment Detail Register');
        this.userDetailService.getUserList();
      },
      err => {
        console.log(err);
      }
    )
  }

  onBack(): void{
    this.router.navigate(['/users']);   
  }

}
