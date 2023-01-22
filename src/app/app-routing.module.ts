import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoggedInGuard } from "./logged-in.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      // Dispatch
      {
        path: '',
        loadChildren: () => import('./pages/loads/loads.module').then(m => m.LoadsModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'loads',
        loadChildren: () => import('./pages/loads/loads.module').then(m => m.LoadsModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'drivers',
        loadChildren: () => import('./pages/drivers/drivers.module').then(m => m.DriversModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'driver-types',
        loadChildren: () => import('./pages/driver-types/driver-types.module').then(m => m.DriverTypesModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'customer-types',
        loadChildren: () => import('./pages/customer-types/customer-types.module').then(m => m.CustomerTypesModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'ageing',
        loadChildren: () => import('./pages/ageing/ageing.module').then(m => m.AgeingModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'payments',
        loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'load-sub-types',
        loadChildren: () => import('./pages/load-sub-types/load-sub-types.module').then(m => m.LoadSubTypesModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'notes',
        loadChildren: () => import('./pages/notes/notes.module').then(m => m.NotesModule),
        canActivate: [LoggedInGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy',
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
