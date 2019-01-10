import { ServicesModule } from './../services/services.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ServicesModule,
    WebStorageModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
