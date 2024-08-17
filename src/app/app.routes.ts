import { Routes } from '@angular/router';
import {BlogComponent} from "./blog/blog.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routs').then(m => m.routes),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
