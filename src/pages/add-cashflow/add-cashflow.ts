import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashflowType } from '../../model/CashflowType';


@IonicPage()
@Component({
	selector: 'page-add-cashflow',
	templateUrl: 'add-cashflow.html',
})
export class AddCashflowPage {
	form: FormGroup;
	cashflowTypes: Array<string>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
		this.cashflowTypes = this.getEnumNames(CashflowType);
		this.form = formBuilder.group({
			date: ['', Validators.required],
			amount: [''],
			type: ['']
		});
	}

	add() {
		console.log(this.form.value);
	}

	getEnumNames(e: any) {
		let objValues = Object.keys(e).map(key => e[key]);
		let names = objValues.filter(value => typeof value === "string") as string[];
		return names;
	}	
}
