import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/index';

import { DataResponse } from './model/data-response.mode';
import { UserTable } from './model/user-table.model';

@Injectable()
export class UsersService {
  data = 'Пользователи, емаил, дата регистрации, дата верификации емаила, тарифный план,\n' + 'дата последнего посещения сайта.'
  constructor(private http: HttpClient) { }

  getUsers(params?: any): Observable<DataResponse> {
    console.warn('params', params);
   return this.http.get('./assets/mock-data.json', {params: this.params(params)})
      .pipe(
        map((res: any) => {
          return new DataResponse(
             res.count,
             this.prepareUsers(res.results)
          );
        })
      );
  }

  prepareUsers(users: any[]): UserTable[] {
    return users.map(user => {
      return new UserTable(user);
    });
  }

  public params(filters) {
    if (filters) {
      let params: any = new HttpParams();
      for (const property in filters) {
        if (
          filters.hasOwnProperty(property) &&
          (filters[property] !== null && filters[property] !== '' && filters[property] !== undefined )
        ) {
          if (Array.isArray(property)) {
            filters[property].forEach((element) => {
              params = params.append(property, element);
            });
          } else {
            params = params.append(property, filters[property]);
          }
        }
      }
      return params;
    }
  }
}
