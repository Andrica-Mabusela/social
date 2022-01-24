import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-system',
  templateUrl: './register-system.component.html',
  styleUrls: ['./register-system.component.css']
})
export class RegisterSystemComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder) { }

  myForm : any;

  toSignIn(){
    this.router.navigate(['signin'])
  }

  onSubmit(form: FormGroup){

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(8) ]],
      confirm_password: ['', Validators.required]
    })
  }

}
