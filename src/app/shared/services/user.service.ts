import {Injectable} from '@angular/core';
import {UserDTO, UserDeleteDto} from '@authentication-based/core/dtos';
import {ResponseApi, UserInterface} from '@authentication-based/core/interfaces';
import {fmt, buildQueryParams} from '@authentication-based/core/utils/helper';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';

const router = {
  user: `/api/v1/users`,
  search: `/api/v1/get-user`
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private baseService: BaseService
  ) {
  }

  loadUsers(limit?: number, skip?: number, typeSort?:string ): Observable<ResponseApi<UserInterface[]>> {
    limit = !limit ? 50 : limit
    skip = !skip ? 0 : skip
    typeSort = !typeSort ? 'account_number' : typeSort
    return this.baseService.search(router.user, {limit, skip, typeSort});
  }

  createUser(user: UserDTO): Observable<ResponseApi<boolean>> {
    return this.baseService.post(router.user, user);
  }

  updateUser(user: UserDTO): Observable<ResponseApi<boolean>> {
    return this.baseService.put(router.user, user);
  }

  deleteUser(email: string): Observable<ResponseApi<boolean>> {
    return this.baseService.delete(router.user, {email});
  }

  searchUser(field: string, value: string):  Observable<ResponseApi<UserInterface[]>>{
    return this.baseService.search(router.search, {field, value})
  }
}
