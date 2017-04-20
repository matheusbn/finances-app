import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the AddCashflowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-add-cashflow',
	templateUrl: 'add-cashflow.html',
})
export class AddCashflowPage {
	form: FormGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			date: [''],
			amount: [''],
			type: ['']
		});

	}

	add() {
		console.log(this.form.value);
	}

}
