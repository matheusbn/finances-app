import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseSources } from '../../model/expense-sources';
import { IncomeSources } from '../../model/income-sources';


@IonicPage()
@Component({
	selector: 'page-add-cashflow',
	templateUrl: 'add-cashflow.html',
})
export class AddCashflowPage {
	form: FormGroup;
	cashflowSources: Array<string>;
	submitFailed: boolean;
	cashflowType: boolean;
	currentDate: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
		this.cashflowType = this.navParams.get('cashflowType');
		this.cashflowSources = this.getEnumNames(this.cashflowType ? IncomeSources : ExpenseSources);
		this.form = formBuilder.group({
			date: ['', Validators.required],
			amount: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
			type: ['', Validators.required]
		});
		
		this.currentDate = new Date().toISOString();
	}

	add() {
		if (this.form.valid) {
			this.form.value.amount = Number( (this.cashflowType ? "" : "-") + this.form.value.amount);
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
