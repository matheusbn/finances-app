import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ExpenseSources } from '../../model/expense-sources';
import { IncomeSources } from '../../model/income-sources';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  filterBy: number = 0
  isIncome: boolean
  isExpense: boolean

  fromValue: number
  toValue: number

  month: number = 0

  fromDate: string = new Date('01-01-' + new Date().getFullYear()).toISOString()
  toDate: string = new Date('12-31-' + new Date().getFullYear()).toISOString()

  source: string

  cashflowSources: string[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  filter() {
    console.log('ISOString:', this.toDate)
    const date = new Date(this.toDate)
    date.setHours(date.getHours() + (date.getTimezoneOffset() / 60), 0, 0, 0)
    date.setHours(23, 59, 59, 999)
    this.toDate = date.toISOString()
    this.viewCtrl.dismiss({
      filterBy: this.filterBy,
      isIncome: this.isIncome,
      isExpense: this.isExpense,
      fromValue: this.fromValue,
      toValue: this.toValue,
      month: this.month,
      fromDate: this.fromDate,
      toDate: this.toDate,
      source: this.source
    })
  }

  manageIncomeCheckbox() {
    if(this.isIncome) {
      this.cashflowSources = this.getEnumNames(IncomeSources)
      this.isExpense = false
    }
  }

  manageExpenseCheckbox() {
    if(this.isExpense) {
      this.cashflowSources = this.getEnumNames(ExpenseSources)
      this.isIncome = false
    }
  }

	private getEnumNames(e: any) {
		const objValues = Object.keys(e).map(key => e[key])
		const names = objValues.filter(value => typeof value === "string") as string[]
		return names
	}	
}
