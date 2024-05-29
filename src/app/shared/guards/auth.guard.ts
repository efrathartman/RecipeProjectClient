import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';


export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  // const router = inject(Router);
  // router.navigateByUrl('login');

  return userService.token ? true : false;
};
