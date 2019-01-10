import { HttpHeaders } from '@angular/common/http';
import { User } from './../../core/models/user';
import { UserDataService } from './../../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { CookiesStorageService } from 'ngx-store';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCredentials: boolean;
  missingCredentials: boolean;
  loginProcessing: boolean;
  loginText: string;

  user: User;
  constructor(
    private userDataService: UserDataService,
    private cookiesStorageService: CookiesStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginText = 'Login';

    this.user = {
      username: '',
      password: ''
    };

    if (
      this.cookiesStorageService.get(environment.storageKeys.accessToken) !==
      undefined
    ) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.invalidCredentials = false;
    this.missingCredentials =
      this.user.username === undefined ||
      this.user.username.length <= 0 ||
      this.user.password === undefined ||
      this.user.password.length <= 0;

    if (!this.missingCredentials) {
      this.loginProcessing = true;
      this.loginText = 'Processing';

      this.userDataService
        .login(this.user)
        .then(data => {
          this.cookiesStorageService.set(
            environment.storageKeys.accessToken,
            data.access_token
          );
          this.cookiesStorageService.set(
            environment.storageKeys.refreshToken,
            data.refresh_token
          );

          this.userDataService
            .getUserFromAccessToken(data.access_token)
            .then(userData => {
              this.user.first_name = userData.firstName;
              this.user.middle_name = userData.middleName;
              this.user.last_name = userData.lastName;
              this.user.username = undefined;
              this.user.password = undefined;
              this.cookiesStorageService.set(
                environment.storageKeys.user,
                this.user
              );

              this.loginProcessing = false;
              this.loginText = 'Login';
              this.router.navigate(['/home']);
            })
            .catch(error => {
              this.loginProcessing = false;
              console.log('ERROR: ', error);
            });
        })
        .catch(error => {
          this.invalidCredentials = true;
          this.loginProcessing = false;
          this.loginText = 'Login';
          console.log('ERROR: ', error);
        });
    }
  }
}
