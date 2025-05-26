import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {ConfigService} from "../../../services/config/config.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  password: string;
  repeatPassword: string;
  cardNumber: string = '';
  email: string;
  isRemember: boolean;
  isShowCardNumber: boolean;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.isShowCardNumber = ConfigService.config.useUserCard
  }

  ngOnDestroy(): void {

  }

  onAuth(): void {
    if (this.password !== this.repeatPassword) {
      this.messageService.add({severity: 'error', summary: 'Passwords are not the same'});
      return
    }

    const userObj: IUser = {
      login: this.login,
      psw: this.password,
      cardNumber: this.cardNumber,
      email: this.email,
    };

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe(
      (data) => {
        this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});
      },
      () => {
        this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
      }
    );

    const result = this.authService.addUser(userObj, this.isRemember);
    if (result !== true) {
      this.messageService.add({severity: 'error', summary: result});
      return;
    }
    this.messageService.add({severity: 'success', summary: 'You are registered and authorized!'});
  }

}
