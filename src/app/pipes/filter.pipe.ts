import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '../shared/user-detail.model';

@Pipe({name: 'fullnameFilter'})
export class FilterPipe implements PipeTransform{

    transform(userDetails: UserDetail[], searchText: string): UserDetail[]
    {
        if(!userDetails){
            return [];
        }
        if(!searchText){
            return userDetails;
        }
        searchText = searchText ? searchText.toLocaleLowerCase() : null;

        return searchText ? userDetails.filter((userDetail: UserDetail) =>
            userDetail.Name.toLocaleLowerCase().indexOf(searchText) !== -1 ||
            userDetail.Surname.toLocaleLowerCase().indexOf(searchText) !== -1) : userDetails;
    }
}
