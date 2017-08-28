import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { DatabaseProvider } from '../../providers/database/database';
import { MoneyDataProvider } from '../../providers/money-data/money-data';
import { Wallet } from '../../model/wallet';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  language: string = 'en'
  fileName: string = 'finances-data.json'

	constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService,
    public database: DatabaseProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController, public moneyData: MoneyDataProvider, private socialSharing: SocialSharing,
    private file: File) {
	}


	ionViewWillLeave() {
		this.translateService.use(this.language)
	}

  addWallet() {
    const alert = this.alertCtrl.create({
      title: 'New Wallet',
      subTitle: 'Enter the name for the new wallet',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',          
        },
        {
          text: 'Confirm',
          handler: async walletData => {
            if(walletData.name) {
              const wallet = new Wallet(walletData.name)
              const data = await this.database.insertWallet(wallet)
              wallet.id = data.insertId
              this.moneyData.wallets.push(wallet)
              this.presentToast("Wallet added")
            }
          }
        }
      ]
    })
    alert.present()
  }

  deleteWallet() {
    const alert = this.alertCtrl.create({
      title: 'Delete Wallet',
      inputs: this.moneyData.wallets.map(wallet => {
        return {
          type: 'radio',
          label: wallet.name,
          value: wallet.id.toString()
        }
      }),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',          
        },
        {
          text: 'Confirm',
          handler: async walletId => {
            if(!walletId) return
            if(this.moneyData.wallets.length === 1) {
              const errorAlert = this.alertCtrl.create({
                title: "Oops!",
                subTitle: "You can't delete your only wallet.",
                buttons: [
                  {
                    text: 'OK'
                  }
                ]
              })
              errorAlert.present()
              return
            }
            if(this.moneyData.currentWalletId == walletId) { // if selected wallet is active, change current wallet
              if(this.moneyData.wallets[0].id === this.moneyData.currentWalletId) 
                this.moneyData.currentWalletId = this.moneyData.wallets[1].id
              else this.moneyData.currentWalletId = this.moneyData.wallets[0].id
            }
            await this.database.deleteWallet(walletId)
            this.moneyData.loadWallets()
            this.moneyData.loadCashflows()
            this.presentToast("Wallet deleted")
          }
        }
      ]
    })
    alert.present()
  }

  async exportData() {
    const loading = this.loadingCtrl.create()
    loading.present()
    const data = []
    const wallets = await this.database.getWallets()
    for(const wallet of wallets) {
      wallet.cashflows = await this.database.getCashflows(wallet.id)
      wallet.cashflows.forEach(cashflow => {
        delete cashflow.id
        delete cashflow.walletId
      })
      delete wallet.id
      data.push(wallet)
    }
    const jsonData = JSON.stringify(data)

    await this.file.writeFile(this.file.dataDirectory, this.fileName, jsonData, { replace: true })
      .catch(console.error)
    loading.dismiss()
    await this.socialSharing.share(``, 'Finances App data', this.file.dataDirectory + this.fileName)
      .catch(console.error)
    this.file.removeFile(this.file.dataDirectory, this.fileName).catch(console.error)
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    })

    toast.present()
}

}
