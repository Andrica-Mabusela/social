import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-system',
  templateUrl: './login-system.component.html',
  styleUrls: ['./login-system.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginSystemComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  myForm: any;
  loginError: any = null;

  toSignUp() {
    this.router.navigate(['signup']);
  }

  onSubmit(form: FormGroup) {
    console.log('onSubmit invoked');
    console.log(this.myForm.value);
    this.authService.loginUser(this.myForm.value).subscribe((data) => {
      console.log('submitted');
      console.log(data);
      if (data.error == null) {
        this.router.navigate(['home']);
        console.log(data.token);
        localStorage.setItem('token', JSON.stringify(data.token));
        console.log('data user: ====', data.user);
        const userData = {
          user_id: data.user.user_id,
          firstName: data.user.firstname,
          lastName: data.user.lastname,
          username: data.user.username,
          email: data.user.email,
        };
        console.log('userData: ', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('refreshIndex', '0')

      } else {
        this.loginError = data.error;
      }
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
