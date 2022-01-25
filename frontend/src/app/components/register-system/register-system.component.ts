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

  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      //set an error on matchingControl if validation fails
      if(control.value !== matchingControl.value){
         matchingControl.setErrors({ confirmPasswordMatch: true})
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  isDateInvalid(dateOfBirth: any){
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[dateOfBirth];

        const date1 = dateOfBirth.getTime()
        const date2 = new Date().getTime()


        // set an error if validation fails
        if( date1 >= date2 ) {
            control.setErrors({isDateInvalid: true})
        }else {
            control.setErrors(null)
        }
        
      }
  }

  onSubmit(form: FormGroup){

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: [null, Validators.required],
      password: ['', [ Validators.required, Validators.minLength(8) ]],
      confirm_password: ['', Validators.required]
    }, {
      validator: [this.confirmPasswordMatch('password', 'confirm_password')]
    })
  }

}
