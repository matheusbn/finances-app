import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	language: string;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public translateService: TranslateService) {
	}


	ionViewWillLeave() {
		this.translateService.use(this.language);
	}

}
