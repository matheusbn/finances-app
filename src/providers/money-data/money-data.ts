import { Injectable } from '@angular/core';
import { Cashflow } from '../../model/cashflow';
import { DatabaseProvider } from '../../providers/database/database';

@Injectable()
export class MoneyDataProvider {
	private _totalMoney: number = 0
	private _cashflows: Cashflow[] = []
	unit: string = "R$ "

	constructor(private database: DatabaseProvider) {}

	get totalMoney(): number {
		return this._totalMoney
	}

	set totalMoney(totalMoney: number) {
		this._totalMoney = Number(totalMoney)
	}

	loadCashflows() {
		return this.database.getCashflows()
			.then(cashflows => {
				this.cashflows = cashflows
			})
	}

	addCashflow(cashflow: Cashflow) {
		this.cashflows.push(cashflow)
		this.database.insertCashflow(cashflow)
		this.totalMoney += cashflow.amount
	}
	
	set cashflows(cashflows: Cashflow[]) {
		this._cashflows = cashflows
		this.totalMoney = 0
		this._cashflows.forEach(cashflow => {
			this.totalMoney += cashflow.amount
		})
	}

	get cashflows(): Cashflow[] {
		return this._cashflows
	}
}
