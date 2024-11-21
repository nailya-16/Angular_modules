import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {Router} from "@angular/router";
import {UserAccessService} from "../user-access.service";
import {UserRules} from "../../../assets/mocks/rules";

const LOCAL_STORAGE_NAME = 'currentUser'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;

  constructor(
    private router: Router,
    private accessService: UserAccessService
  ) {
    if (this.isAuthenticated) {
      return
    }
    const storedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    if (storedUser) {
      this.userStorage.push(storedUser);
      this.auth(storedUser)
      this.accessService.initAccess(UserRules);
    }
  }

  private getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;
  }

  private auth(user: IUser, isRememberMe?: boolean) {
    this.currentUser = user;
    if (isRememberMe) {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));
    }
  }

  private authAndRedirect(user: IUser, isRememberMe?: boolean) {
    this.auth(user, isRememberMe);
    this.router.navigate(['tickets']);
  }

  get isAuthenticated(): boolean  {
    return !!this.currentUser ;
  }
  get isUserInStore(): boolean  {
    return !!localStorage.getItem(LOCAL_STORAGE_NAME);
  }


  get user(): IUser | null {
    return this.currentUser;
  }

  get token(): string | null {
    return this.isAuthenticated ? 'my-token' : null;
  }

  authUser(login: string, password: string, isRememberMe: boolean): true | string {
    const user = this.getUser(login);
    if (!user) {
      return 'User not found';
    }
    if (user.password !== password) {
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
    this.currentUser.password = password;
    const dbUser = this.userStorage.find(({login}) => login === this.currentUser?.login)!;
    dbUser.password = password
  }
}
