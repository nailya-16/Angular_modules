import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TicketStorageService} from "../../../services/ticket-storage/ticket-storage.service";
import {ITour} from "../../../models/tours";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour;
  isNotFound: boolean = false;

  user: IUser;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketStorage: TicketStorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.ticketStorage.fetchTickets().subscribe(this.setCurrentTicket.bind(this));
    this.setCurrentTicket();

    this.user = this.authService.user!;

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl(''),
      birthday: new FormControl(''),
      age: new FormControl(22),
      citizenship: new FormControl(''),
    })
  }

  ngOnChange() {
    this.setCurrentTicket();
  }

  setCurrentTicket() {

    const routerId = this.route.snapshot.paramMap.get('id');

    if (routerId) {
      const ticket = this.ticketStorage.getTicket(routerId);
      if (!ticket) {
        this.isNotFound = true;
        return;
      }
      this.isNotFound = false;
      this.ticket = ticket;
    }
  }

  selectDate(ev: Date | PointerEvent) {
    const selected = ev instanceof PointerEvent ? undefined : ev
    this.userForm.patchValue({
      'birthday': selected
    })
  }

  onSubmit() {
    console.log(this.userForm.value)
  }

}
