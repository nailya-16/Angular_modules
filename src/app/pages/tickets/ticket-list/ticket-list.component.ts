import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ITour} from "../../../models/tours";
import {TicketStorageService} from "../../../services/ticket-storage/ticket-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TicketListComponent implements OnInit {
  search: string = '';

  @ViewChild('tourWrap') tourWrap: ElementRef;
  constructor(
    private router: Router,
    private ticketStorage: TicketStorageService
              ) {
  }

  get tickets() {
    return this.ticketStorage.tickets;
  }

  get filteredTickets() {
    if (!this.search) {
      return this.ticketStorage.tickets;
    }
    const search = this.search.toLowerCase()
    return this.ticketStorage.tickets.filter(({name}) => name.toLowerCase().includes(search));
  }

  ngOnInit(): void {
    this.ticketStorage.fetchTickets();
  }

  ngAfterViewInit() {
    this.tourWrap
  }

  goToTicket(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`]);
  }
}
