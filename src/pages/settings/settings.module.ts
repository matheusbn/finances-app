import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicModule.forChild(SettingsPage),
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
