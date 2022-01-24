import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-system',
  templateUrl: './login-system.component.html',
  styleUrls: ['./login-system.component.css']
})
export class LoginSystemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toSignUp(){
    this.router.navigate(['signup'])
  }

}
