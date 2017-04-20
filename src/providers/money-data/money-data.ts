import { Injectable } from '@angular/core';
import { Cashflow } from '../../model/Cashflow';

@Injectable()
export class MoneyDataProvider {
	totalMoney: number;
	cashflows: Array<Cashflow>;


    constructor() {
    }

    getTotalMoney(): number {
        return this.totalMoney;
    }
    addCashflow(cashflow: Cashflow) {
        this.cashflows.push(cashflow);
    }
    getCashflows(): Array<Cashflow> {
        return this.cashflows;
    }

}
