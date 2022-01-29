import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from 'src/app/services/profile-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileServiceService) {}

  currentUserPosts: any = [];
  x: any = localStorage.getItem('user');
  currentUser: any = JSON.parse(this.x);
  id: any;

  getCurrentUserPosts() {
    this.profileService.getUserPosts(this.id).subscribe((data) => {
      console.log(data.posts);
      this.currentUserPosts = data.posts;
    });
  }

  ngOnInit(): void {
    // this.getCurrentUserPosts()
    this.id = JSON.parse(this.x).user_id;
    console.log('user id =', this.id);
    this.getCurrentUserPosts();
  }
}
