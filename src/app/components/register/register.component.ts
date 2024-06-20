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
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, FormsModule,MatIconModule,MatButtonModule,MatDividerModule,CommonModule,MatCardActions,MatCardContent,MatCardTitle,MatCardHeader,MatCard],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  state = { email: '' , password: ''};
  email = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$")]);
  password = new FormControl('',[
    Validators.required,
    Validators.pattern('^(?=.*[A-z])(?=.*[0-9])'),
    Validators.minLength(4),
    Validators.maxLength(20),
  ]);

  errorMessage = '';
  errorPassword='סיסמא'
  erroruser='';
  isOk:boolean=false;
  private userService=inject(UserService);
  // @Input()
  constructor(private server:UserService,private router: Router,private route: ActivatedRoute) {
    // merge(this.email.statusChanges, this.email.valueChanges,this.password.statusChanges,this.password.valueChanges)
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => {
      
    //   });
  }
  
  addUser(form:NgForm)
  {
    console.log(form.value,"form");
    
    this.userService
    .addUser({username:form.value.username,email:form.value.email,password:form.value.password,address:form.value.address,role:'user'})
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      this.router.navigate(['/allrecipe']);
      
  },(error)=>{
    this.erroruser="המשתמש כבר קיים במערכת";
    console.log("error",error);
    this.isOk=true;
    
  }
  )
  }
  ngOnInit() {
    
    console.log("po");
    const state = history.state as { email: string; password: string };
    console.log(state);

  if (state) {
    console.log("lll");
    this.email.setValue(state.email );
    this.password.setValue(state.password);
    this.state.email = state.email;
    this.state.password = state.password;
    
    
  }
 
  }

}
