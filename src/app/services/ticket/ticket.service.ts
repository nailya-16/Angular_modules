import {Injectable} from '@angular/core';
import {TicketRestService} from "../ticket-rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {ITour, ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>()
  readonly $ticketType = this.ticketSubject.asObservable()

  constructor(private ticketServiceRest: TicketRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map((items) => {
      return items.concat(items.filter(({type}) => type === 'single'));
    }));
  }

  getTicketTypeObservable() {
    return this.ticketSubject.asObservable();
  }

  updateTour(type: ITourTypeSelect) {
    this.ticketSubject.next(type);
  }

  getError() {
    return this.ticketServiceRest.getRestError();
  }
}
