import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from './user-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDataService } from './post-data.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [UserDataService, PostDataService]
})
export class ServicesModule {}
