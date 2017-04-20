import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddCashflowPage } from './add-cashflow';

@NgModule({
  declarations: [
    AddCashflowPage,
  ],
  imports: [
    IonicModule.forChild(AddCashflowPage),
  ],
  exports: [
    AddCashflowPage
  ]
})
export class AddCashflowPageModule {}
