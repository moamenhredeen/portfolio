import {Component, inject, OnDestroy} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {DesktopLayoutComponent} from "./desktop-layout/desktop-layout.component";
import {MobileLayoutComponent} from "./mobile-layout/mobile-layout.component";
import {Subject, takeUntil} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
    selector: 'app-layout',
    imports: [
        RouterOutlet,
        DesktopLayoutComponent,
        MobileLayoutComponent
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnDestroy {

  desktopLayout = true;
  destroyed = new Subject<void>();

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.desktopLayout = !result.matches;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
