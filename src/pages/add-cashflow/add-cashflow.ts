import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
	submitFailed: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
		this.cashflowTypes = this.getEnumNames(CashflowType);
		this.form = formBuilder.group({
			date: ['', Validators.required],
			amount: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
			type: ['', Validators.required]
		});
	}

	add() {
		if (this.form.valid) {
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
