import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
	TranslateModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
