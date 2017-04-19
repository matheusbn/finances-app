import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StatisticsPage } from '../pages/statistics/statistics';
import { SettingsPage } from '../pages/settings/settings';

import { TranslateService } from 'ng2-translate';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
	menuSections:Array<{title:string, component:any}>;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translateService: TranslateService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            translateService.setDefaultLang('en');
            this.menuSections = [
                { title: "pages.statistics.title", component: StatisticsPage },
                { title: "pages.settings.title", component: SettingsPage },
            ]
        });
    }
}

