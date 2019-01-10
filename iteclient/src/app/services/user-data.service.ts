import { User } from './../core/models/user';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../core/models/token';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {}

  login(user: User): Promise<Token> {
    const options = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Token>(
        environment.urls.appUrl + 'oauth/token',
        {
          grant_type: 'password',
          client_id: 2,
          client_secret: 'ygoZ5JBXsXFjO55ml4z8bRB6Ert3KYGcMWnVOi9j',
          username: user.username,
          password: user.password
        },
        {
          headers: options
        }
      )
      .toPromise();
  }

  getUserFromAccessToken(accessToken: string): Promise<any> {
    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken
    });
    console.log('ACCESS TOKEN: ', accessToken);

    return this.http
      .get<any>(environment.urls.apiUrl + 'user', {
        headers: options
      })
      .toPromise();
  }
}
