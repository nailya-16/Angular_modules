import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TreeNode} from "primeng/api";
import {TOrder} from "../../shared/mock/orders";
import {OrdersService} from "../../services/orders/orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _destroyer: Subscription;
  tableData$: Observable<TreeNode<TOrder[]>[]>;

  constructor(
    private orderService: OrdersService,
  ) {
  }

  ngOnInit(): void {
    this.initOrders();

    this._destroyer = this.orderService.groupOrders$.subscribe((data) => {
      this.initOrders()
    })
  }

  ngOnDestroy() {
    this._destroyer.unsubscribe()
  }

  initOrders() {
    this.tableData$ = this.orderService.getOrders();
  }
}
