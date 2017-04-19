import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    IonicModule.forChild(StatisticsPage),
  ],
  exports: [
    StatisticsPage
  ]
})
export class StatisticsPageModule {}
