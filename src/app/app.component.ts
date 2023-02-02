import { DOCUMENT, } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { SplashScreenService } from '../@fury/services/splash-screen.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
    private http: HttpClient,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private splashScreenService: SplashScreenService) {
    this.splashScreenService.load();
    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

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
        // icon: 'dashboard',
        icon: 'fa fa-truck-fast fa-lg',
        isFaIcon: true,
        position: 5,
        pathMatchExact: true
      },
      {
        name: 'Brokerage',
        routeOrFunction: '/loads/brokerage',
        // icon: 'dashboard',
        icon: 'fa fa-truck fa-lg',
        isFaIcon: true,
        position: 6,
        pathMatchExact: true
      },
      {
        name: 'CONFIGURATION',
        position: 30,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Drivers',
        routeOrFunction: '/drivers',
        icon: 'fa fa-light fa-id-card fa-lg',
        isFaIcon: true,
        position: 34,
      },
      {
        name: 'Driver Types',
        routeOrFunction: '/driver-types',
        icon: 'fa fa-address-card fa-lg',
        isFaIcon: true,
        position: 32,
      },
      {
        name: 'Customers',
        icon: 'fa fa-user fa-lg',
        isFaIcon: true,
        position: 37,
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
        icon: 'fa fa-users fa-lg',
        isFaIcon: true,
        position: 36,
      },
      {
        name: 'Users',
        routeOrFunction: '/users',
        icon: 'verified_user',
        position: 31,
      },
      {
        name: 'Load Sub Types',
        routeOrFunction: '/load-sub-types',
        icon: 'clear_all',
        position: 35,
      },
      {
        name: 'FINANCE',
        position: 11,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Ageing',
        routeOrFunction: '/ageing',
        icon: 'account_balance',
        position: 12,
      },
      {
        name: 'Payments Due',
        routeOrFunction: '/payments',
        icon: 'payment',
        position: 13,
      },
      {
        name: 'Payment History',
        routeOrFunction: '/payment-history',
        icon: 'fa fa-money-check-dollar fa-lg',
        isFaIcon: true,
        position: 13,
      },
      {
        name: 'UI TABLE SETTINGS',
        position: 75,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Table Settings',
        routeOrFunction: '/table-settings',
        icon: 'view_list',
        position: 76,
        pathMatchExact: true
      },
      {
        name: 'NOTES & ISSUES',
        position: 100,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Notes',
        routeOrFunction: '/notes',
        icon: 'speaker_notes',
        position: 105,
        pathMatchExact: true
      },
    ]);

    //this a lame way to make sure the user is authenticated on app load
    this.http
      .get(`${environment.apiUrl}customer_types`)
      .subscribe({
        next: (response) => {
          if (!response) {
            console.log(response);
          }
        }
      });

  }

}
