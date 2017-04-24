import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import { Cashflow } from '../../model/cashflow';
import { CashflowType } from '../../model/cashflow-type';

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
		// 	amount: 22,
		// 	type: CashflowType[1],
		// 	resultingMoney: 22
		// };
	}


    addCashflow() {
        let modal = this.modalCtrl.create('AddCashflowPage');
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
