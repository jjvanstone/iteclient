import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => AuthModule
  },
  {
    path: 'home',
    loadChildren: () => HomeModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
