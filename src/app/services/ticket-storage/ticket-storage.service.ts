import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketStorageService {
  private ticketStorage: ITour[]
  constructor() { }

  setStorage(data: ITour[]): void {
   // запись данных в this.ticketStorage
  }
  getStorage(): ITour[] {
     // возвращает в this.ticketStorage
    return []
  }
}
