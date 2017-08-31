import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

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
  ],
  providers: [
    SocialSharing,
    File,
    FileChooser,
    FilePath
  ]
})
export class SettingsPageModule {}
