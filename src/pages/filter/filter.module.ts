import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPage } from './filter';

import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    FilterPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPage),
	  TranslateModule
  ],
  exports: [
    FilterPage
  ]
})
export class FilterPageModule {}
