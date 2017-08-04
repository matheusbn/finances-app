import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from 'ng2-translate';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any = 'HomePage'
  menuSections: Array<{ title: string, component: any }>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    translateService: TranslateService) {
    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()

      translateService.setDefaultLang('en')
      this.menuSections = [
        { title: "pages.statistics.title", component: 'StatisticsPage' },
        { title: "pages.settings.title", component: 'SettingsPage' }
      ];
    })
  }
  navTo(pageLink: string) {
    this.nav.push(pageLink)
  }
}

