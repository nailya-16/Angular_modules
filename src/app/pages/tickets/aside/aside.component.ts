import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menu";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketService} from "../../../services/ticket/ticket.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  constructor(
    private ticketService: TicketService
  ) {
  }

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  onChangeType(ev: { ev: Event, value: IMenuType }): void {
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    this.ticketService.updateTour({date: ev})
  }
}
