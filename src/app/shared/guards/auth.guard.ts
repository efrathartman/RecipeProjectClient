import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';


export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  // const router = inject(Router);
  // router.navigateByUrl('login');
  if(userService.token)
    {
      console.log("true");
    }
  return userService.token ? true : false;
};
