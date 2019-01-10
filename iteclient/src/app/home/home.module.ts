import { WebStorageModule } from 'ngx-store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ServicesModule } from '../services/services.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    WebStorageModule,
    FormsModule,
    ServicesModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
