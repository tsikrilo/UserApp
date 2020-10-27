import { Injectable } from '@angular/core';
import { IUserDetail } from './user-detail.model';
import { HttpClient } from '@angular/common/http';
import { IUserTitle } from './user-title.model';
import { IUserType } from './user-type.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  // TODO cleanup unused properties
  userDetail: IUserDetail;
  userTitleModel: IUserTitle;
  userTypeModel: IUserType;
  usersList: IUserDetail[];
  user: IUserDetail;
  userTypesList: IUserType[];
  userTitlesList: IUserTitle[];

  constructor(private http: HttpClient) {}

  // TODO always define return type of methods
  postUserDetail(): Observable<IUserDetail> {
    this.userDetail.UserTitleId = +this.userDetail.UserTitleId;
    this.userDetail.UserTypeId = +this.userDetail.UserTypeId;

    // TODO base url should be an environment variable environment.baseUrl
    return this.http.post<IUserDetail>(`https://localhost:44384/api/Users`, this.userDetail);
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
    // TODO only handle errors where called
    return this.http.get<IUserDetail[]>(`https://localhost:44384/api/Users`)
    .pipe(
      catchError(this.handleError)
    );
  }

  // TODO wrong error
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
