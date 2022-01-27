import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  user: any;

  ngOnInit(): void {
    const getUserData: any = localStorage.getItem('user')
    this.user = JSON.parse(getUserData)
  }

}
