import { Injectable } from '@angular/core';
import { Cashflow } from '../../model/cashflow';
import { DatabaseProvider } from '../../providers/database/database';

@Injectable()
export class MoneyDataProvider {
	totalMoney: number;
	cashflows: Cashflow[];
	unit: string;

	constructor(private database: DatabaseProvider) {
		this.cashflows = [];
		this.totalMoney = 0;
		this.unit = "R$ ";
	}

	getTotalMoney(): number {
		return this.totalMoney;
	}

	loadCashflows(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.database.initialize()
				.then(() => {
					this.database.getCashflows()
						.then(cashflows => {
							this.setCashflows(cashflows);
							resolve();
						})
						.catch(error => reject(error));
				})
				.catch(error => reject(error));
		});
	}
	addCashflow(cashflow: Cashflow) {
		this.cashflows.push(cashflow);
		this.database.insertCashflow(cashflow);
		this.totalMoney += Number(cashflow.amount);
	}
	setCashflows(cashflows: Cashflow[]) {
		this.cashflows = cashflows;
		this.totalMoney = 0;
		this.cashflows.forEach(cashflow => {
			this.totalMoney += cashflow.amount;
		})
	}
	getCashflows(): Cashflow[] {
		let dinheiros: Array<Cashflow>;
		dinheiros = this.cashflows;
		return dinheiros;
	}

	getUnit(): string {
		return this.unit;
	}
	setUnit(unit: string) {
		this.unit = unit;
	}
}
