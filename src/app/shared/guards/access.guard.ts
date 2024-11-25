import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserAccessService} from "../../services/user-access/user-access.service";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard  {

  constructor(private accessService: UserAccessService) {
  }
  canActivateChild (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('route', route, 'state', state);
    const routerFullPath = state.url;
    console.log('this.accessService.canRead(routerFullPath);', this.accessService.canRead(routerFullPath))
    return this.accessService.canRead(routerFullPath);
  }

}
