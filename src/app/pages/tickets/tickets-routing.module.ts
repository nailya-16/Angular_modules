import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from "./tickets.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";

const routes: Routes = [
  { path: '',
    component: TicketsComponent,
    children: [
      {
        path: "",
        redirectTo: "ticket-list",
        pathMatch: "full",
      },
      {
        path: 'ticket-list',
        component: TicketListComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
