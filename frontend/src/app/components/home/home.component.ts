import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  user: any;

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.user = JSON.parse(this.user)
    console.log(this.user)
  }

}
