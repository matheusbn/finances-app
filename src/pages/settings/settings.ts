import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';


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
