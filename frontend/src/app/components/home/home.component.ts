import { Component, OnInit, Input } from '@angular/core';
import { UserStories } from 'src/app/models/user-stories.model';
import { UserservicesService } from 'src/app/services/userservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() userInfo: any;

  user: any;

  _post?: UserStories[];
  _postToBeUpdated: UserStories = {
    username: '',
    captions: '',
    state: false,
    comments: '',
    media: '',
    location: ''
  }

  _newPost: UserStories = {
    username: '',
    captions: '',
    state: false,
    comments: '',
    media: '',
    location: ''
  }
  submitted = false;
  username = '';
  accounts: UserStories[] = [];

  constructor(private _users: UserservicesService) { }

  ngOnInit(): void {
    const getUserData: any = localStorage.getItem('user')
    this.user = JSON.parse(getUserData)
    
    this.getAllPosts();
  }

  getAllPosts(): void {
    this._users.getAll().subscribe({
      next: (data) => {
        this._post = data;
      },
      error: (e) => console.error(e)
    });
  }

  findAccount(): void {
    this._users.searchByUsername(this.username).subscribe({
      next: (data) => {
        this._post = data;
      },
      error: (e) => console.error(e)
    });
  }

  searchAccout(): void {
    this._users.searchByUsername(this.username).subscribe({
      next: (data) => {
        this.accounts = data;
        console.log(data);
      },
      error: (e) => console.error(e)
      
    });
  }

  // searchAccout(username: string): void {
  //   this._users.searchByUsername(username).subscribe((data) => {
  //     this.accounts = data
  //   });
  // }


  saveStory(): void {
    const data = {
      captions: this._newPost.captions,
      location: this._newPost.location,
      comments: this._newPost.comments,
      media: this._newPost.media
    };

    this._users.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          // this.refreshComponent();
        },
        error: (e) => console.error(e)
      });
  }


  newPostStory(): void {
    this._newPost = {
      username: '',
      captions: '',
      location: '',
      media: '',
      comments: ''
    };
  }

}
