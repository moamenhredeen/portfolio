import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-mobile-layout',
    imports: [
        RouterOutlet,
        RouterLink,
    ],
    templateUrl: './mobile-layout.component.html',
    styleUrl: './mobile-layout.component.css',
    animations: [
        trigger('drawerAnimation', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('.2s ease-in-out', style({ transform: 'translateX(0)' })),
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0)' }),
                animate('.2s ease-in', style({ transform: 'translateX(-100%)' })),
            ]),
        ]),
        trigger('backdropAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('.2s ease-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('.2s ease-in', style({ opacity: 0 })),
            ]),
        ])
    ]
})
export class MobileLayoutComponent {
  showDrawer = false;
}
