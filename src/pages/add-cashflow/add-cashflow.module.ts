import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCashflowPage } from './add-cashflow';
import { TranslateModule,  } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    AddCashflowPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCashflowPage),
	TranslateModule
  ],
  exports: [
    AddCashflowPage
  ]
})
export class AddCashflowPageModule {}
