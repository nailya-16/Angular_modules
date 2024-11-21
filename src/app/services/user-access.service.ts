import { Injectable } from '@angular/core';
import {IUserRules, UserRules} from "../../assets/mocks/rules";
import {debounce, debounceTime, Observable, of, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {
  private accessMap = new Map()  // TODO создать тип для accessMap
  constructor() { }

  initAccess(rules: IUserRules[]): void {
    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        const formattedString = this.formattedPath(rule.path);
        this.accessMap.set(formattedString, rule.rules)
      });
    }
  }

  canWrite(path: string): boolean {
    const formattedString = this.formattedPath(path);
    console.log('formattedString',formattedString)
    console.log(' this.accessMap',  this.accessMap)
    return this.accessMap.get(formattedString)?.write
  }

  formattedPath(path: string): string {
    if (typeof path === "string") {
      return path.replace(/\//g, " ").trim().replace(/\s/g, '.');
    }
    return '';
  }

  getUserRules(): Observable<IUserRules[]> {
    return of(UserRules).pipe(debounceTime(200));
  }
}
