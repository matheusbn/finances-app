import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import { Cashflow } from '../../model/cashflow';

import { MoneyDataProvider } from '../../providers/money-data/money-data';


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
		public moneyData: MoneyDataProvider) {
		this.unit = this.moneyData.getUnit();
		this.dateFormat = 'pt-BR';
		this.cashflows = [];
		this.totalMoney = 0;


		// this.cashflows[0] = {
		// 	date: "12/07/1995",
		// 	amount: -22,
		// 	type: "Food",
		// 	resultingMoney: 22
		// };
	}

	
	// The parameter cashflowType is used to determine wheter to add an income (true) or an expense (false).
    addCashflow(cashflowType: boolean) {
        let modal = this.modalCtrl.create('AddCashflowPage', {cashflowType: cashflowType});
		modal.onDidDismiss(data => {
			if(data) {
				data.resultingMoney = this.totalMoney + data.amount;
				this.totalMoney = data.resultingMoney;
				this.moneyData.addCashflow(data);
				this.cashflows.push(data);
			}
		})
        modal.present();
    }
}
