import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
	TranslateModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
