import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  login: string;
  password: string;
  repeatPassword: string;
  cardNumber: string = '';
  email: string;
  isRemember: boolean;

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  onAuth(): void {
    if (this.password !== this.repeatPassword) {
      this.messageService.add({severity:'error', summary: 'Passwords are not the same'});
      return
    }

    const user: IUser = {
      login: this.login,
      password: this.password,
    }
    const result = this.authService.addUser(user, this.isRemember);
    if (result !== true) {
      this.messageService.add({severity:'error', summary: result});
      return;
    }
    this.messageService.add({severity:'success', summary: 'You are registered and authorized!'});
  }

}
