import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../../services/ticket/ticket.service";
import {ITour} from "../../../models/tours";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  search: string = '';

  constructor(private ticketService: TicketService) {
  }

  get filteredTickets() {
    if (!this.search) {
      return this.tickets;
    }
    const search = this.search.toLowerCase()
    return this.tickets.filter(({name}) => name.toLowerCase().includes(search));
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
      }
    )
  }

}
