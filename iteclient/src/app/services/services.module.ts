import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [UserDataService]
})
export class ServicesModule {}
