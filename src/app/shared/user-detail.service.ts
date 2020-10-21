import { Injectable } from '@angular/core';
import { UserDetail } from './user-detail.model';
import { HttpClient } from '@angular/common/http';
import { UserTitle } from './user-title.model';
import { UserType } from './user-type.model';
import { Observable, throwError } from 'rxjs';
import { ObservableInput } from 'rxjs/internal/types';
import { first, tap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  userModel: UserDetail = new UserDetail();
  userTitleModel: UserTitle = new UserTitle();
  userTypeModel: UserType = new UserType();
  usersList: UserDetail[];
  user:UserDetail;
  userTypesList: UserType[];
  userTitlesList: UserTitle[];
  

  constructor(private http: HttpClient) {}

  postUserDetail(){
    this.userModel.UserTitleId = +this.userModel.UserTitleId;
    this.userModel.UserTypeId = +this.userModel.UserTypeId;
    return this.http.post(`https://localhost:44384/api/Users`, this.userModel);
  }

  putUserDetail(){
    this.userModel.UserTitleId = +this.userModel.UserTitleId;
    this.userModel.UserTypeId = +this.userModel.UserTypeId;
    return this.http.put(`https://localhost:44384/api/Users/${this.userModel.Id}`, this.userModel);    
  }

  deleteUserDetail(userId: number){
    return this.http.delete(`https://localhost:44384/api/Users/${userId}`);
  }

  getUserList(): Observable<UserDetail[] | undefined>{
    return this.http.get<UserDetail[]>(`https://localhost:44384/api/Users`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  handleError(handleError: any): import("rxjs").OperatorFunction<UserDetail[], any> {
    throw new Error('Method not implemented.');
  }

  getUser(userId: number): Observable<UserDetail | undefined>{
      return this.http.get<UserDetail>(`https://localhost:44384/api/Users/${userId}`)
      .pipe(
        catchError(this.handleError)
      );      
  }

  getUserTitleList(): Observable<UserTitle[] | undefined>{
    return this.http.get<UserTitle[]>(`https://localhost:44384/api/UserTitles`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUserTypeList():Observable<UserType[] | undefined>{
    return this.http.get<UserType[]>(`https://localhost:44384/api/UserTypes`)
    .pipe(
      catchError(this.handleError)
    )
  }
}
