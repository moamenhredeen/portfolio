import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'work',
        loadComponent: () => import('./work/work.component').then(m => m.WorkComponent),
      },
      // {
      //   path: 'blog',
      //   loadChildren: () => import('./blog/blog.routs').then(m => m.routes),
      // },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]
  },
];
