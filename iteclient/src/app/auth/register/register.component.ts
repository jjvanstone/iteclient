import { CookiesStorageService } from 'ngx-store';
import { UserDataService } from './../../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  usernameError: boolean;
  passwordError: boolean;
  firstNameError: boolean;
  lastNameError: boolean;
  processing: boolean;

  constructor(
    private userDataService: UserDataService,
    private cookiesStorageService: CookiesStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    this.processing = true;
    this.usernameError =
      this.user.username === undefined || this.user.username.length <= 0;
    this.passwordError =
      this.user.password === undefined || this.user.password.length <= 0;
    this.firstNameError =
      this.user.first_name === undefined || this.user.first_name.length <= 0;
    this.lastNameError =
      this.user.last_name === undefined || this.user.last_name.length <= 0;

    if (
      !this.usernameError &&
      !this.passwordError &&
      !this.firstNameError &&
      !this.lastNameError
    ) {
      this.userDataService
        .register(this.user)
        .then(result => {
          console.log('REGISTRATION RESULT: ', result);
          this.user.id = result.id;

          this.userDataService
            .login(this.user)
            .then(loginResult => {
              this.cookiesStorageService.set(
                environment.storageKeys.accessToken,
                loginResult.access_token
              );
              this.cookiesStorageService.set(
                environment.storageKeys.refreshToken,
                loginResult.refresh_token
              );

              this.cookiesStorageService.set(
                environment.storageKeys.user,
                this.user
              );

              this.user = new User();
              this.processing = false;

              this.router.navigate(['/']);
            })
            .catch(error => {
              console.error(error);
              this.processing = false;
            });
        })
        .catch(error => {
          console.error(error);
          this.processing = false;
        });
    } else {
      this.processing = false;
    }
  }
}
