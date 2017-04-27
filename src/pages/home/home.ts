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
	cashflows: Array<Cashflow>;
	unit: string;
	dateFormat: string;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController,
		public moneyData: MoneyDataProvider, public database: DatabaseProvider) {
		this.cashflows = [];
		this.database.initialize()
			.then(() => this.loadCashflows())
			.catch(error => console.log(error));
		this.unit = this.moneyData.getUnit();
		this.dateFormat = 'pt-BR';
		this.totalMoney = 0;


		// this.cashflows.push({
		// 	date: new Date('2014-12-31'),
		// 	amount: -22,
		// 	type: "Food",
		// 	resultingMoney: 22
		// });
	}


	// The parameter cashflowType is used to determine wheter to add an income (true) or an expense (false).
	addCashflow(cashflowType: boolean) {
		let modal = this.modalCtrl.create('AddCashflowPage', { cashflowType: cashflowType });
		modal.onDidDismiss(data => {
			if (data) {
				data.resultingMoney = this.totalMoney + data.amount;
				this.totalMoney = data.resultingMoney;
				this.moneyData.addCashflow(data);
				this.cashflows.push(data);
				this.database.insertCashflow(data);
			}
		})
		modal.present();
	}

	loadCashflows() {
		this.database.getCashflows()
			.then(cashflows => {
				this.cashflows = cashflows
			})
			.catch(error => console.log(error));
	}
}
