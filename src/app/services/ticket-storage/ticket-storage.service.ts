import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";
import {TicketService} from "../ticket/ticket.service";

@Injectable({
  providedIn: 'root'
})
export class TicketStorageService {
  private ticketStorage: ITour[] = [];
  constructor(private ticketService: TicketService) { }

  get tickets () {
    return this.ticketStorage;
  }

  getTicket(id: string) {
    return this.ticketStorage.find((e) => e.id === id);
  }

  fetchTickets (force?: boolean) {
    if (this.ticketStorage.length && !force) {
      return;
    }
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.ticketStorage = data;
      }
    )
  }

  setStorage(data: ITour[]): void {
   // запись данных в this.ticketStorage
  }
  getStorage(): ITour[] {
     // возвращает в this.ticketStorage
    return []
  }
}
