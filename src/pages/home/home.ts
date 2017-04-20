import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
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

	constructor(public navCtrl: NavController) {
		this.totalMoney = 0;
	}

}
