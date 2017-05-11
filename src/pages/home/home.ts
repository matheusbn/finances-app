import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import { Cashflow } from '../../model/cashflow';

import { MoneyDataProvider } from '../../providers/money-data/money-data';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	totalMoney: number;
	cashflows: Cashflow[];
	unit: string;
	dateFormat: string;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController,
		public moneyData: MoneyDataProvider, public database: DatabaseProvider) {

		if (!this.cashflows) {
			this.totalMoney = 0;
			this.unit = this.moneyData.unit;
			this.dateFormat = 'pt-BR';

			this.cashflows = [];
			this.moneyData.loadCashflows()
				.then(() => {
					this.cashflows = this.moneyData.cashflows;
					this.totalMoney = this.moneyData.totalMoney;
				})
				.catch(error => console.log(error));
		}
	}

	// The parameter cashflowType is used to determine wheter to add an income (true) or an expense (false).
	addCashflow(cashflowType: boolean) {
		let modal = this.modalCtrl.create('AddCashflowPage', { cashflowType: cashflowType });
		modal.onDidDismiss(data => {
			if (data) {
				this.totalMoney += data.amount;
				data.resultingMoney = this.totalMoney;
				this.moneyData.addCashflow(data);
			}
		})
		modal.present();
	}
}
