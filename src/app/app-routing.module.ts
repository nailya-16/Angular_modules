import {inject, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AuthService} from "./services/auth/auth.service";
import {AppComponent} from "./app.component";

const authGuard = () => {
  const router = inject(Router)
  if (!inject(AuthService).isAuthenticated) {
    router.navigate(['auth']);
  }
  return true;
}

const routes: Routes = [
  {
    path: '', component: AppComponent, canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'tickets',
    loadChildren: ()  => import('./pages/tickets/tickets.module').then(m => m.TicketsModule),
    canActivate: [authGuard]
  },

  { path: '**',
   redirectTo: 'auth'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
