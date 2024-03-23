import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menu";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType
  constructor() { }

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  onChangeType(ev: {ev: Event, value: IMenuType}): void {
    this.updateMenuType.emit(ev.value);
  }
}
