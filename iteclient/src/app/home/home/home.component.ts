import { Router } from '@angular/router';
import { CookiesStorageService } from 'ngx-store';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookiesStorageService: CookiesStorageService, private router: Router) { }

  ngOnInit() {
    if (this.cookiesStorageService.get(environment.storageKeys.accessToken) === undefined) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.cookiesStorageService.set(environment.storageKeys.accessToken, undefined);
    this.cookiesStorageService.set(environment.storageKeys.refreshToken, undefined);
    this.cookiesStorageService.set(environment.storageKeys.user, undefined);
    this.router.navigate(['/']);
  }

}
