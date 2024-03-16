import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";
import {Router} from "@angular/router";

const LOCAL_STORAGE_NAME = 'currentUser'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  constructor(
    private router: Router,
  ) {
    if (this.isAuthenticated) {
      this.router.navigate(['tickets']);
      return
    }
    const storedUser: IUser | null = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || 'null');
    if (storedUser) {
      this.userStorage.push(storedUser);
      this.auth(storedUser)
    }
  }

  private getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;
  }

  private auth (user: IUser, isRememberMe?: boolean) {
    this.currentUser = user;
    if (isRememberMe) {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user));
    }
    this.router.navigate(['tickets']);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  get user(): IUser | null {
    return this.currentUser;
  }

  authUser(login: string, password: string, isRememberMe: boolean): true | string {
    const user = this.getUser(login);
    if (!user) {
      return 'User not found';
    }
    if (user.password !== password) {
      return 'Wrong password';
    }
    this.auth(user, isRememberMe)
    return true;
  }

  addUser(user: IUser, isRememberMe?: boolean): true | string {
    if (this.getUser(user.login)) {
      return 'User already exists';
    }
    this.userStorage.push(user);
    this.auth(user, isRememberMe)
    return true;
  }

  logout() {
    this.userStorage = this.userStorage.filter(({ login }) => login === this.currentUser?.login);
    this.currentUser = null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.router.navigate(['auth']);
  }
}
