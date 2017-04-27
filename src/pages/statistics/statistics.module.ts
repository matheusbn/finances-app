import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticsPage),
	TranslateModule
  ],
  exports: [
    StatisticsPage
  ]
})
export class StatisticsPageModule {}
