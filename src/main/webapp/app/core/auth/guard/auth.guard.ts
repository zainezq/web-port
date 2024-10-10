import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from "../auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Allow access to the route
  } else {
    router.navigate(['/']); // Redirect to the home page
    console.log('Unauthorized access - redirecting to home');
    return false; // Deny access to the route
  }
};
