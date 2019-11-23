import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule
} from '@angular/material';
import { CtSelectComponent } from './select.component';

@NgModule({
  declarations: [CtSelectComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [CtSelectComponent]
})
export class CtSelectModule {}
