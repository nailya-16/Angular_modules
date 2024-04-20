import {inject, NgModule} from '@angular/core';
import {PreloadAllModules, Router, RouterModule, Routes} from '@angular/router';
import {AuthService} from "./services/auth/auth.service";

const authGuard = () => {
  const router = inject(Router)
  if (!inject(AuthService).isAuthenticated) {
    router.navigate(['auth']);
  }
  return true;
}

const authRedirect = () => {
  const router = inject(Router)
  if (inject(AuthService).isAuthenticated) {
    router.navigate(['tickets']);
  }
  return true;
}

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [authRedirect]
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
