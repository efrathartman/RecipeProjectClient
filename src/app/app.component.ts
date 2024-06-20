import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from './shared/models/user';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { authGuard } from './shared/guards/auth.guard';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,HomeComponent,HttpClientModule,RouterModule,CommonModule,MatTabsModule,MatTooltip],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
  
})
export class AppComponent {
  
  constructor(private router: Router) {}
   char:string='';
   
  title = 'Recipes';
  userService = inject(UserService); 
  
  check():boolean{
    
    return !!this.userService.token
   
  }
  leave()
  {
    localStorage.clear();
    window.location.reload()
    return this.userService.token=null;
   
  }
  getInitial(name: string |null): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }
  
  
  // onMoveToSignUp(data: { email: string, password: string }) {
  //   console.log('Received data:', data);
  //   // כאן תוכל לטפל בנתונים איך שאתה רוצה
  // }
 
//   onActivate(component: any) {
    
//     if (component instanceof LoginComponent) {
//       component.moveToSignUpEvent.subscribe((data: {email:string,password:string}) => {
//         this.onMoveToSignUp(data);
       
//       });
//     }
// }
// onMoveToSignUp(data: { email: string, password: string }) {
//   console.log('Received data:', data);
//   // this.userDataService.setUserData(data);

  // this.router.navigate(['/register']);
//}
}
