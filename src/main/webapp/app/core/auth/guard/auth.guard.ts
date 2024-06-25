import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from "../auth.service";
import {LoadingSpinnerService} from "../../loading-spinner/loading-spinner.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loadingSpinnerService = inject(LoadingSpinnerService);
  loadingSpinnerService.show();
  if (authService.isAuthenticated()) {
    loadingSpinnerService.hide();
    return true; // Allow access to the route
  } else {
    router.navigate(['/']); // Redirect to the home page
    console.log('Unauthorized access')
    loadingSpinnerService.hide();
    return false; // Deny access to the route
  }
};
