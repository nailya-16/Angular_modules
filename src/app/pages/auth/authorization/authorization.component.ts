import { Component, OnInit } from '@angular/core'
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAccessService } from 'src/app/services/user-access/user-access.service';
import { UserRules } from 'src/app/shared/mock/rules';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})

export class AuthorizationComponent implements OnInit {
  login: string;
  password: string;
  cardNumber: string = '';
  isRememberMe: boolean;
  isHaveCard: boolean;
  constructor(private authService: AuthService, 
              private messageService: MessageService,
              private accessService: UserAccessService,
              private http: HttpClient,
              private router: Router) { }

    ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  onAuth(): void {
    const auth: IUser = {
      login: this.login,
      psw: this.password,
      cardNumber: this.cardNumber
    }; 
  
    this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/' + auth.login, auth).subscribe((data: {access_token: string}) => {
      auth.id = data.id;
      const userToken: string = data.access_token;
      this.authService.setToken(userToken);
      this.authService.setUser({login: auth.login});
      this.accessService.initAccess(UserRules);
      this.router.navigate(['tickets/ticket-list']);
    }, () => {
      this.messageService.add({severity:'warn', summary:"Ошибка"});
    });
   
     //this.authService.authUser(this.login, this.password, this.isRememberMe);
   /* if (result !== true) {
      this.messageService.add({severity:'error', summary: result});
      return;
    }
    this.messageService.add({severity:'success', summary: 'You are authorized!'});*/
  }
}
