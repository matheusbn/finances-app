import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashflowType } from '../../model/cashflow-type';


@IonicPage()
@Component({
	selector: 'page-add-cashflow',
	templateUrl: 'add-cashflow.html',
})
export class AddCashflowPage {
	form: FormGroup;
	cashflowTypes: Array<string>;
	submitFailed: boolean;

	currentDate: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
		this.cashflowTypes = this.getEnumNames(CashflowType);
		this.form = formBuilder.group({
			date: ['', Validators.required],
			amount: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
			type: ['', Validators.required]
		});
		
		this.currentDate = new Date().toISOString();
	}

	add() {
		if (this.form.valid) {
			this.form.value.amount = Number(this.form.value.amount);
			this.form.value.date = new Date(this.form.value.date);
			this.viewCtrl.dismiss(this.form.value);

		}
		else {
			this.submitFailed = true;
		}
	}

	getEnumNames(e: any) {
		let objValues = Object.keys(e).map(key => e[key]);
		let names = objValues.filter(value => typeof value === "string") as string[];
		return names;
	}	
}
