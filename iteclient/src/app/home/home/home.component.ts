import { Router } from '@angular/router';
import { CookiesStorageService } from 'ngx-store';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/core/models/post';
import { PostDataService } from 'src/app/services/post-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hasNoContent: boolean;
  isCreating: boolean;
  fetchingPosts: boolean;
  posts: Post[];
  newPost: Post;
  constructor(private cookiesStorageService: CookiesStorageService, private postDataService: PostDataService, private router: Router) { }

  ngOnInit() {
    if (this.cookiesStorageService.get(environment.storageKeys.accessToken) === undefined) {
      this.router.navigate(['/']);
    }

    this.newPost = new Post();
    this.newPost.user = this.cookiesStorageService.get(environment.storageKeys.user);

    this.getPosts();
  }

  getPosts() {
    this.fetchingPosts = true;
    this.posts = [];
    this.postDataService.getAllPosts().then(posts => {
      console.log('POSTS: ', posts);
      posts.forEach(post => {
        post.user.complete_name = [post.user.first_name, post.user.middle_name, post.user.last_name].join(' ');

        this.posts.push({
          user: post.user,
          created_at: post.created_at,
          content: post.content
        });

        this.fetchingPosts = false;
      });
    }).catch(error => {
      console.error(error);
    });
  }

  createPost() {
    if (this.newPost.content !== undefined && this.newPost.content.length > 0) {
      this.postDataService.createPost(this.newPost).then(data => {
        this.newPost.content = '';
        this.getPosts();
      }).catch(error => {
        console.error(error);
      });
    } else {
      this.hasNoContent = true;
    }
  }

  logout() {
    this.cookiesStorageService.set(environment.storageKeys.accessToken, undefined);
    this.cookiesStorageService.set(environment.storageKeys.refreshToken, undefined);
    this.cookiesStorageService.set(environment.storageKeys.user, undefined);
    this.router.navigate(['/']);
  }

}
