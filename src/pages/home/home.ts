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

	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
		this.totalMoney = 0;
	}


    addCashflow() {
        console.log('aaa');
        let modal = this.modalCtrl.create('AddCashflowPage');
        modal.present();
    }
}
