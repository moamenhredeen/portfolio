import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChildrenOutletContexts, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {slideInAnimation} from "./app.animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'moamenhredeen';
}
