import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Post } from '../core/models/post';
import { environment } from 'src/environments/environment';
import { CookiesStorageService } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private http: HttpClient, private cookiesStorageService: CookiesStorageService) { }

  createPost(post: Post): Promise<boolean> {
    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' +  this.cookiesStorageService.get(environment.storageKeys.accessToken)
    });

    return this.http.put<boolean>(environment.urls.apiUrl + 'post', {
      user_id: post.user.id,
      content: post.content
    }, {
      headers: options
    }).toPromise();
  }

  getAllPosts(): Promise<Post[]> {
    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' +  this.cookiesStorageService.get(environment.storageKeys.accessToken)
    });

    return this.http.get<Post[]>(environment.urls.apiUrl + 'posts', {
      headers: options
    }).toPromise();
  }
}
