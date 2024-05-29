import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, FormsModule,MatIconModule,MatButtonModule,MatDividerModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(10),
    Validators.pattern('^(?=.*[A-z])(?=.*[0-9])')
  ]);
  errorMessage = '';
  errorPassword='סיסמא'
  erroruser='';
  private userService=inject(UserService);
  // @Input()
  constructor(private server:UserService,private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges,this.password.statusChanges,this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
      
      });
  }
  
  addUser(form:NgForm)
  {
    this.userService
    .addUser({username:form.value.username,email:form.value.email,password:form.value.password,address:form.value.address,role:'user'})
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      this.router.navigate(['/home']);
      
  },(error)=>{
    this.erroruser="המשתמש כבר קיים במערכת";
  }
   
  )
    
  }

  //  email: string = '';
  // password: string = '';

  

  // ngOnInit() {
  //   const data = this.userDataService.getUserData();
  //   if (data) {
  //     this.email = data.email;
  //     this.password = data.password;
  //   }
  // }
}
