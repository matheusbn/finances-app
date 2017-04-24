import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import { AddCashflowPage } from '../add-cashflow/add-cashflow';

import { Cashflow } from '../../model/Cashflow';
import { CashflowType } from '../../model/CashflowType';


@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	totalMoney: number;
	cashflows: Array<Cashflow>;
	unit: string;

	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
		this.unit = 'R$ ';
		this.cashflows = [];
		this.cashflows[0] = {
			date: "12/07/1995",
			amount: 22,
			type: "Food"
		};
		this.totalMoney = 0;
	}


    addCashflow() {
        let modal = this.modalCtrl.create('AddCashflowPage');
		modal.onDidDismiss(data => {
			console.log(data);
			this.cashflows.push(data);
		})
        modal.present();
    }
}
