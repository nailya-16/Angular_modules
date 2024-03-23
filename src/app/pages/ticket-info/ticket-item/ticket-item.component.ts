import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TicketStorageService} from "../../../services/ticket-storage/ticket-storage.service";
import {ITour} from "../../../models/tours";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour;
  isNotFound: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketStorage: TicketStorageService
  ) { }

  ngOnInit(): void {
    this.ticketStorage.fetchTickets();
    const routerId = this.route.snapshot.paramMap.get('id');

    if (routerId) {
      const ticket = this.ticketStorage.getTicket(routerId);
      if (!ticket) {
        this.isNotFound = true;
        return;
      }
      this.ticket = ticket;
    }
  }

}
