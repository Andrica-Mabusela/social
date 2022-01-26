import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-system',
  templateUrl: './login-system.component.html',
  styleUrls: ['./login-system.component.css']
})
export class LoginSystemComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  myForm: any;
  loginError: any = null

  toSignUp(){
    this.router.navigate(['signup'])
  }

  onSubmit(form: FormGroup){
    console.log('onSubmit invoked')
    console.log(this.myForm.value)
    this.authService.loginUser(this.myForm.value).subscribe((data) => {
      console.log('submitted')
      this.loginError = data.value;
      console.log(data)
    })

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

}
