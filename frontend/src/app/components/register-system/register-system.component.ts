import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-system',
  templateUrl: './register-system.component.html',
  styleUrls: ['./register-system.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterSystemComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  myForm: any;

  emailExistsError: string = '';
  invalidEmailError: string = '';

  toSignIn() {
    this.router.navigate(['signin']);
  }

  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      //set an error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(form: FormGroup) {
    console.log('you reached here');
    console.log(this.myForm.value);
    this.authService.createUser(this.myForm.value).subscribe((data) => {
      this.emailExistsError = data.error;
      if (data.error == null) {
        this.router.navigate(['home']);
        console.log(data.user);
        localStorage.setItem('token', JSON.stringify(data.token));
        const userData = {
          user_id: data.user.user_id,
          firstName: data.user.firstname,
          lastName: data.user.lastname,
          username: data.user.username,
          email: data.user.email,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        if (localStorage.getItem('refreshIndex') == '0') {
          location.reload();
          localStorage.setItem('refreshIndex', '1');
        }
      } else {
        this.invalidEmailError = data.error;
        console.log(this.invalidEmailError);
      }
      console.log(data.error);
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', Validators.required],
      },
      {
        validator: [this.confirmPasswordMatch('password', 'confirm_password')],
      }
    );
  }
}
