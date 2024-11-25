import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {debounceTime, delay, Observable, of, switchMap} from 'rxjs';
import {AuthService, LOCAL_STORAGE_NAME} from "../../services/auth/auth.service";
import {UserAccessService} from "../../services/user-access/user-access.service";
import {IUserRules} from "../mock/rules";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router, private accessService: UserAccessService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    } else if (this.authService.isUserInStore) {
        const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
        this.authService.setUser(userInfo);
        // then send request
        return this.accessService.getUserRules().pipe(
          delay(2000),
          switchMap((roles) => {
            console.log('must send req')
            if (Array.isArray(roles) && roles.length > 0) {
              this.accessService.initAccess(roles);
              return of(true);
            } else {
              return of(false);
            }
          })
        );
      } else {
        return this.authService.isAuthenticated;
    }
  }
}
