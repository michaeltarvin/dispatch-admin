import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { ClickOutsideModule } from '../../../@fury/shared/click-outside/click-outside.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { BackdropModule } from '../../../@fury/shared/backdrop/backdrop.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { LoadingIndicatorModule } from '../../../@fury/shared/loading-indicator/loading-indicator.module';
import { ToolbarFullscreenToggleComponent } from './toolbar-fullscreen-toggle/toolbar-fullscreen-toggle.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { ToolbarQuickpanelToggleComponent } from './toolbar-quickpanel-toggle/toolbar-quickpanel-toggle.component';
import { ToolbarSearchBarComponent } from './toolbar-search-bar/toolbar-search-bar.component';
import { ToolbarSearchComponent } from './toolbar-search/toolbar-search.component';
import { ToolbarSidenavMobileToggleComponent } from './toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarComponent } from './toolbar.component';
import { ConfigPanelModule } from '../config-panel/config-panel.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FormsModule,
    ClickOutsideModule,
    FuryCardModule,
    ConfigPanelModule,
    FurySharedModule,
    BackdropModule
  ],
  declarations: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarNotificationsComponent,
    ToolbarSearchComponent,
    ToolbarSearchBarComponent,
    ToolbarQuickpanelToggleComponent,
    ToolbarFullscreenToggleComponent,
    ToolbarSidenavMobileToggleComponent
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
