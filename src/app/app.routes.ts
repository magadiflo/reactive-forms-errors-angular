import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./forms/forms.routes').then(r => r.routes),
  },
  { path: '**', redirectTo: 'form', },

];
