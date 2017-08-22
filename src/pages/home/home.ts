import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

import { Cashflow } from '../../model/cashflow';

import { MoneyDataProvider } from '../../providers/money-data/money-data';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	totalMoney: number
  cashflows: Cashflow[]
	unit: string
  dateFormat: string
  months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]
  dateOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year:'numeric'
  }

	constructor(public navCtrl: NavController, public modalCtrl: ModalController,
		public moneyData: MoneyDataProvider, public database: DatabaseProvider) {
		if (!this.cashflows) {
			this.totalMoney = 0
			this.unit = this.moneyData.unit
			this.dateFormat = 'pt-BR'

			database.initialize().then(() => {
				this.moneyData.loadCashflows()
					.then(() => {
						this.cashflows = this.moneyData.cashflows
            this.totalMoney = this.moneyData.totalMoney
					})
			})

			this.cashflows = []
		}
  }

	// The parameter cashflowType is used to determine wheter to add an income (true) or an expense (false).
	addCashflow(cashflowType: boolean) {
		const modal = this.modalCtrl.create('AddCashflowPage', { cashflowType: cashflowType })
		modal.onDidDismiss(data => {
			if (data) {
				this.totalMoney += data.amount
				data.resultingMoney = this.totalMoney
				this.moneyData.addCashflow(data)
			}
		})
		modal.present()
  }
  
  filter() {
    const modal = this.modalCtrl.create('FilterPage')
    modal.onDidDismiss(data => {
      if(data) {
        if((data.isIncome && data.isExpense) || (!data.isIncome && !data.isExpense)) {
          this.cashflows = this.moneyData.cashflows
        }
        else {
          this.cashflows = this.moneyData.cashflows.filter(cf => {
            if(data.isIncome) return cf.amount >= 0

            else return cf.amount < 0
          })
        }

        if(data.filterBy == 0) {
          if(data.fromValue != null) this.cashflows = this.cashflows.filter(cf => cf.amount >= data.fromValue)
          if(data.toValue != null) this.cashflows = this.cashflows.filter(cf => cf.amount <= data.toValue)
        }
        else if(data.filterBy == 1) {
          this.cashflows = this.cashflows.filter(cf => cf.date.getMonth() == data.month)
        }
        else if(data.filterBy == 2) {
          console.log(new Date(data.fromDate), new Date(data.toDate))
          if(data.fromDate != null) this.cashflows = this.cashflows.filter(cf => cf.date >= new Date(data.fromDate))
          if(data.toDate != null) this.cashflows = this.cashflows.filter(cf => cf.date <= new Date(data.toDate))
        }
        else if(data.filterBy == 3) {
           this.cashflows = this.cashflows.filter(cf => cf.source === data.source)
        }
      }
    })
    modal.present()
  }

  clearFilters() {
    this.cashflows = this.moneyData.cashflows
  }
}
