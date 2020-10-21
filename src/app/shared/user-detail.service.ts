import { Injectable } from '@angular/core';
import { IUserDetail } from './user-detail.model';
import { HttpClient } from '@angular/common/http';
import { IUserTitle } from './user-title.model';
import { IUserType } from './user-type.model';
import { Observable, throwError } from 'rxjs';
import { ObservableInput } from 'rxjs/internal/types';
import { first, tap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  userDetail: IUserDetail;
  userTitleModel: IUserTitle;
  userTypeModel: IUserType;
  usersList: IUserDetail[];
  user: IUserDetail;
  userTypesList: IUserType[];
  userTitlesList: IUserTitle[];
  

  constructor(private http: HttpClient) {}

  postUserDetail(){
    this.userDetail.UserTitleId = +this.userDetail.UserTitleId;
    this.userDetail.UserTypeId = +this.userDetail.UserTypeId;
    return this.http.post(`https://localhost:44384/api/Users`, this.userDetail);
  }

  putUserDetail(){
    this.userDetail.UserTitleId = +this.userDetail.UserTitleId;
    this.userDetail.UserTypeId = +this.userDetail.UserTypeId;
    return this.http.put(`https://localhost:44384/api/Users/${this.userDetail.Id}`, this.userDetail);    
  }

  deleteUserDetail(userId: number){
    return this.http.delete(`https://localhost:44384/api/Users/${userId}`);
  }

  getUserList(): Observable<IUserDetail[] | undefined>{
    return this.http.get<IUserDetail[]>(`https://localhost:44384/api/Users`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<IUserDetail[], any> {
    throw new Error('Method not implemented.');
  }

  getUser(userId: number): Observable<IUserDetail | undefined>{
      return this.http.get<IUserDetail>(`https://localhost:44384/api/Users/${userId}`)
      .pipe(
        catchError(this.handleError)
      );      
  }

  getUserTitleList(): Observable<IUserTitle[] | undefined>{
    return this.http.get<IUserTitle[]>(`https://localhost:44384/api/UserTitles`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUserTypeList():Observable<IUserType[] | undefined>{
    return this.http.get<IUserType[]>(`https://localhost:44384/api/UserTypes`)
    .pipe(
      catchError(this.handleError)
    )
  }
}
