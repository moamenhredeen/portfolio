import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from "./app.animations";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    animations: [
        slideInAnimation
    ]
})
export class AppComponent {
  title = 'moamenhredeen';
}
