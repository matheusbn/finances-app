import { Injectable } from '@angular/core';
import { Cashflow } from '../../model/cashflow';

@Injectable()
export class MoneyDataProvider {
	totalMoney: number;
	cashflows: Array<Cashflow>;
	unit: string;

    constructor() {
		this.cashflows = [];
		this.totalMoney = 0;
		this.unit = "R$ ";
    }

    getTotalMoney(): number {
        return this.totalMoney;
    }

    addCashflow(cashflow: Cashflow) {
        this.cashflows.push(cashflow);
		this.totalMoney += Number(cashflow.amount);
    }
    getCashflows(): Array<Cashflow> {
        return this.cashflows;
    }

	getUnit(): string {
		return this.unit;
	}
	setUnit(unit: string) {
		this.unit = unit;
	}
}
