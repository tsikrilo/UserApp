import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../shared/user-detail.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { UserDetail } from '../shared/user-detail.model';
import { UserTitle } from '../shared/user-title.model';
import { UserType } from '../shared/user-type.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './users.component.html',
  styles: []
})

export class UsersComponent implements OnInit {

  constructor(public userDetailService:UserDetailService,
              private router: Router,
              private route: ActivatedRoute) { }
  
  filterPipe: FilterPipe;
  searchText: string;
  pageTitle= "User List";
  users: UserDetail[];
  errorMessage: string;
  userTitleList: UserTitle[];
  userTypeList: UserType[];

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
    this.userDetailService.userModel = Object.assign({}, selectedRecord);
    this.userDetailService.userModel.BirthDate = selectedRecord.Birthdate;
  }
  onDelete(Id:number) {
    if (confirm('Are you sure to delete this user?')) {
      this.userDetailService.deleteUserDetail(Id)
        .subscribe(res => {
          this.userDetailService.getUserList();
        },
        error => { console.log(error); })
    }
  }

  createNewUser(){
    this.router.navigateByUrl('/users/0');
  }
}
