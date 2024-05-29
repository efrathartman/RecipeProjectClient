import { Component, EventEmitter, Output, inject } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatDividerModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  @Output()
  moveToSignUpEvent: EventEmitter<{email:string,password:string}> = new EventEmitter<{email:string,password:string}>();
  hide=true
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  erroruser='';
  private userService=inject(UserService);

  constructor(private server: UserService,private router:Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  // signIn(password: string,email:string) {
  //   this.server
  //     .signIn(password,email)
      
  // }
  login(form:NgForm)
  {
    console.log(form.value.password.password,form.value.email.email); 
    this.userService
    .login({email:form.value.email,password:form.value.password})
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      if (this.userService.token) {
    
        this.router.navigate(['/allrecipe']);
    }

  },(error)=>{
    this.erroruser="המשתמש לא קיים במערכת";
  })
  }

register(form:NgForm)
{
  this.moveToSignUpEvent.emit({email: form.value.email,password:form.value.password});
  this.router.navigate(['/register']);
}
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'שדה חובה';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'מייל לא חוקי';
    } else {
      this.errorMessage = '';
    }
  }
  // onSubmit(form: NgForm) {
  //   console.log('form');
  //   console.log(form);
  //   console.log('form.errors');
  //   console.log(form.errors);
  //   console.log('form.value');
  //   console.log(form.value);
  // }
}
