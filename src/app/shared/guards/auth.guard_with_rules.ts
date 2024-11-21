import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {UserAccessService} from "../../services/user-access.service";
import {IUserRules} from "../../../assets/mocks/rules";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private accessService: UserAccessService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    } else if (this.authService.isUserInStore) {
      console.log('must send req')
      return this.accessService.getUserRules().pipe(
        switchMap((roles) => {
          if (Array.isArray(roles) && roles.length > 0) {
            return of(true);
          } else {
            return of (false);
          }
        })
      );
    } else {
      return this.authService.isAuthenticated
    }

  }

}
