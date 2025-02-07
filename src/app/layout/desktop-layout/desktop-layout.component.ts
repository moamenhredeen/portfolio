import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-desktop-layout',
    imports: [
        RouterLinkActive,
        RouterLink,
        RouterOutlet
    ],
    templateUrl: './desktop-layout.component.html',
    styleUrl: './desktop-layout.component.css'
})
export class DesktopLayoutComponent {

}
