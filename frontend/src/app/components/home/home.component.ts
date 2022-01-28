import { Component, OnInit, Input } from '@angular/core';
import { UserStories } from 'src/app/models/user-stories.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserservicesService } from 'src/app/services/userservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() userInfo: any;
  postForm: any;

  user: any;
  images: any;
  allPosts: any;

  constructor(
    private _users: UserservicesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  _post?: UserStories[];
  _postToBeUpdated: UserStories = {
    username: '',
    captions: '',
    state: false,
    comments: '',
    media: '',
    location: '',
  };

  _newPost: UserStories = {
    username: '',
    captions: '',
    state: false,
    comments: '',
    media: '',
    location: '',
  };
  submitted = false;
  username = '';
  accounts: UserStories[] = [];

  ngOnInit(): void {
    const getUserData: any = localStorage.getItem('user');
    this.user = JSON.parse(getUserData);

    this.postForm = this.fb.group({
      uploadedImage: '',
      location: '',
      caption: '',
    });

    this.getAllPosts();
    console.log(this.allPosts)
  }

  getAllPosts(): void {
    this._users.getAll().subscribe((data) => {
      this.allPosts = data
      console.log(this.allPosts)
    })
  }

  saveStory(): void {
    const data = {
      captions: this._newPost.captions,
      location: this._newPost.location,
      comments: this._newPost.comments,
      media: this._newPost.media,
    };

    this._users.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        // this.refreshComponent();
      },
      error: (e) => console.error(e),
    });
  }

  // SELECT IMAGE
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onCreatePost(): void {
    const formData = new FormData();
    formData.append('uploadedImage', this.images);
    formData.append('location', this.postForm.value.location);
    formData.append('caption', this.postForm.value.caption);
    formData.append('username', this.user.username);
    formData.append('user_id', this.user.user_id);

    this._users.create(formData).subscribe((data) => {
      console.log(data);
      window.location.reload()
    });
  }

  logUserOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['signin'])
  }

}
