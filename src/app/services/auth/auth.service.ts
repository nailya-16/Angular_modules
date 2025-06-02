import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {Router} from "@angular/router";
import {UserAccessService} from "../user-access/user-access.service";
import {UserRules} from "../../shared/mock/rules";
import {BehaviorSubject, Subject} from "rxjs";

export const LOCAL_STORAGE_NAME = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new Subject();
  user$ = this.userSubject.asObservable();
  token: string;
  private userBehaviorSubject = new BehaviorSubject(null);
  userBehavior$ = this.userBehaviorSubject.asObservable();
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;

  private userBasketSubject = new Subject();
  basket$ = this.userBasketSubject.asObservable();

  constructor(
    private router: Router,
    private accessService: UserAccessService
  ) {

    const storedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    if (storedUser) {
     //this.userStorage.push(storedUser);
     this.auth(storedUser)
    }
  }

  public getUser(login: string): IUser | null {
  return this.userStorage.find(user => user.login === login) || null;
}
  
  private auth(user: IUser, isRememberMe?: boolean) {
    console.log('user', user)
    this.currentUser = user;
    this.accessService.initAccess(UserRules);

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));

    // send user to Subject
    this.userSubject.next(this.currentUser);
  }

  initUserToSubject(): void {
    this.userSubject.next(this.currentUser);
    this.userBehaviorSubject.next(this.currentUser);
  }
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }

  addBasketToSubject(): void {
    this.userBasketSubject.next('basket' +  Math.random());
  }

  setUser(user: any): void {
    this.currentUser = user;
  }

  private authAndRedirect(user: IUser, isRememberMe?: boolean) {
    this.auth(user, isRememberMe);
    this.router.navigate(['tickets']);
  }

  get isAuthenticated(): boolean  {
    return !!this.currentUser || !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }
  get isUserInStore(): boolean  {
    return !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }


  public get user(): IUser | null {
    return this.currentUser;
  }

  /*get token(): string | null {
    return this.isAuthenticated ? 'my-token' : null;
  }*/

  authUser(login: string, password: string, isRememberMe: boolean): true | string {
    const user = this.getUser(login);
    if (!user) {
      return 'User not found';
    }
    if (user.psw !== password) {
      return 'Wrong password';
    }
    this.authAndRedirect(user, isRememberMe)
    return true;
  }

  addUser(user: IUser, isRememberMe?: boolean): true | string {
    if (this.getUser(user.login)) {
      return 'User already exists';
    }
    this.userStorage.push(user);
    this.authAndRedirect(user, isRememberMe)
    return true;
  }

  logout() {
    this.userStorage = this.userStorage.filter(({login}) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['auth']);
  }

  changePassword(password: string) {
    if (!this.currentUser) {
      return
    }
    this.currentUser.psw = password;
    /*const dbUser = this.userStorage.find(({login}) => login === this.currentUser?.login)!;
    dbUser.password = password*/
  }
}
