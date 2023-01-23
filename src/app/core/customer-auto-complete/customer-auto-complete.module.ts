import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { CustomerAutoCompleteComponent } from './customer-auto-complete.component';

@NgModule({
  declarations: [
    CustomerAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FuryCardModule,
    ScrollbarModule,
  ],
  exports: [CustomerAutoCompleteComponent]
})
export class CustomerAutoCompleteModule { }
