import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-mobile-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './mobile-layout.component.html',
  styleUrl: './mobile-layout.component.css'
})
export class MobileLayoutComponent {
  drawerState = false;
}
