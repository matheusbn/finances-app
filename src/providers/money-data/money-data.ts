import { Injectable } from '@angular/core';
import { Cashflow } from '../../model/cashflow';
import { Wallet } from '../../model/wallet';
import { DatabaseProvider } from '../../providers/database/database';


@Injectable()
export class MoneyDataProvider {
	private _totalMoney: number = 0
  private _cashflows: Cashflow[] = []
  private _currentWalletId: number
  wallets: Wallet[]
	unit: string = "R$ "

	constructor(private database: DatabaseProvider) {
  }

	get totalMoney(): number {
		return this._totalMoney
	}

	set totalMoney(totalMoney: number) {
		this._totalMoney = Number(totalMoney)
  }
  
  get currentWalletId(): number {
    return this._currentWalletId
  }

  set currentWalletId(currentWalletId: number) {
    this._currentWalletId = Number(currentWalletId)
    this.database.activateWallet(this.currentWalletId)
  }

  async load() {
    this.loadWallets()
    this.currentWalletId = await this.database.getCurrentWalletId()
    await this.loadCashflows()
  }

	async loadWallets() {
    this.wallets = await this.database.getWallets()
  }

  async loadCashflows() {
    this.cashflows = await this.database.getCashflows(this.currentWalletId)
  }
  

	addCashflow(cashflow: Cashflow) {
    this.totalMoney += cashflow.amount
    cashflow.resultingMoney = this.totalMoney
    const index = this.addByDate(this.cashflows, cashflow)
    this.database.insertCashflow(cashflow, this.currentWalletId).then(data => {
      cashflow.id = data.insertId
      if(index !== 0) this.updateResultingMoney(cashflow, index)
    })
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

  private updateResultingMoney(cashflow: Cashflow, index: number) {
    if(index === this.cashflows.length-1) cashflow.resultingMoney = cashflow.amount
    else cashflow.resultingMoney = this.cashflows[index + 1].resultingMoney + cashflow.amount
    this.database.updateCashflowResultingMoney(cashflow)
    this.cashflows.forEach((cf, i) => {
      if(i >= index) return
      this.cashflows[i].resultingMoney += cashflow.amount
      this.database.updateCashflowResultingMoney(this.cashflows[i])
    })
  }

  private addByDate(cashflows: Cashflow[], cashflow: Cashflow): number {
    let min: number = 0
    let max: number = cashflows.length - 1
    let index: number

    if (cashflows.length === 0 || cashflows[0].date.valueOf() < cashflow.date.valueOf()) {
      cashflows.unshift(cashflow)
      return 0
    }
    if (cashflows[max].date.valueOf() > cashflow.date.valueOf()) {
      cashflows.push(cashflow)
      return max + 1
    }

    while (min <= max) {
      index = Math.floor((min + max) / 2)

      if (cashflows[index].date.valueOf() <= cashflow.date.valueOf() 
        && cashflows[index + 1].date.valueOf() >= cashflow.date.valueOf()) {
        cashflows.splice(index + 1, 0, cashflow)
        return index + 1
      }
      if (cashflows[index].date.valueOf() > cashflow.date.valueOf()) min = index + 1
      else if (cashflows[index].date.valueOf() < cashflow.date.valueOf()) max = index - 1
    }

    return -1
  }
}
