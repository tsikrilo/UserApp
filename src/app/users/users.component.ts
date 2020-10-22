import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../shared/user-detail.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { IUserDetail } from '../shared/user-detail.model';
import { IUserTitle } from '../shared/user-title.model';
import { IUserType } from '../shared/user-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styles: []
})

export class UsersComponent implements OnInit {

  constructor(public userDetailService:UserDetailService,
              private router: Router,
              private route: ActivatedRoute,
              private notifyService : NotificationService) { }
  
  filterPipe: FilterPipe;
  searchText: string;
  pageTitle= "User List";
  users: IUserDetail[];
  errorMessage: string;
  userTitleList: IUserTitle[];
  userTypeList: IUserType[];

  ngOnInit(): void {
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
  viewUser(selectedRecord:any) {
    this.userDetailService.userDetail = Object.assign({}, selectedRecord);
    this.userDetailService.userDetail.BirthDate = selectedRecord.Birthdate;
  }
  onDelete(Id:number) {
    if (confirm('Are you sure to delete this user?')) {
      this.userDetailService.deleteUserDetail(Id)
        .subscribe(res => {
          this.notifyService.showSuccess("User deleted successfully !!","DELETE USER");        
          setTimeout(() => 
          {
            this.router.navigate(['/users'])
            .then(() => {
              window.location.reload();
            }); 
          },
          2000); 
        },
        error => { console.log(error); })
    }
  }

  createNewUser(){
    this.router.navigateByUrl('/users/0');
  }

}
