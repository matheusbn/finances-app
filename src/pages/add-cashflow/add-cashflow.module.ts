import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCashflowPage } from './add-cashflow';

@NgModule({
  declarations: [
    AddCashflowPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCashflowPage),
  ],
  exports: [
    AddCashflowPage
  ]
})
export class AddCashflowPageModule {}
