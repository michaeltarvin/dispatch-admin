import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService) {
    this.splashScreenService.load();
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.sidenavService.addItems([
      {
        name: 'DISPATCH',
        position: 1,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Loads',
        routeOrFunction: '/loads',
        icon: 'dashboard',
        position: 5,
        pathMatchExact: true
      },
      {
        name: 'CONFIGURATION',
        position: 30,
        type: 'subheading',
      },
      {
        name: 'Drivers',
        routeOrFunction: '/drivers',
        icon: 'people_outline',
        position: 31,
      },
      {
        name: 'Driver Types',
        routeOrFunction: '/driver-types',
        icon: 'folder_shared',
        position: 32,
      },
      {
        name: 'Customers',
        icon: 'account_circle',
        position: 33,
        subItems: [
          {
            name: 'Shippers',
            icon: 'account_circle',
            routeOrFunction: '/customers/shippers',
            position: 1
          },
          {
            name: 'Billers',
            icon: 'account_circle',
            routeOrFunction: '/customers/billers',
            position: 2
          },
          {
            name: 'Recievers',
            icon: 'account_circle',
            routeOrFunction: '/customers/receivers',
            position: 3
          }
        ]
      },
      {
        name: 'Customer Types',
        routeOrFunction: '/customer-types',
        icon: 'contacts',
        position: 33,
      },
      {
        name: 'Users',
        routeOrFunction: '/users',
        icon: 'verified_user',
        position: 34,
      },
      {
        name: 'FINANCE',
        position: 11,
        type: 'subheading',
      },
      {
        name: 'Ageing',
        routeOrFunction: '/ageing',
        icon: 'account_balance',
        position: 12,
      },
      {
        name: 'Payments',
        routeOrFunction: '/payments',
        icon: 'payment',
        position: 13,
      },
    ]);
  }
}
