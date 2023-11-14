import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadComponent: () => import('./pages/basic-page/basic-page.component').then(c => c.BasicPageComponent),
      },
      {
        path: 'middle',
        loadComponent: () => import('./pages/middle-page/middle-page.component').then(c => c.MiddlePageComponent),
      },
      {
        path: 'advanced',
        loadComponent: () => import('./pages/advanced-page/advanced-page.component').then(c => c.AdvancedPageComponent),
      },
      { path: '**', redirectTo: 'basic', },
    ]
  }
]
