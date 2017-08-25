import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Cashflow } from '../../model/cashflow';
import { Wallet } from '../../model/wallet';

@Injectable()
export class DatabaseProvider {

	database: SQLiteObject

	constructor(private sqlite: SQLite) {}

	async initialize(): Promise<any> {
    this.database = await this.sqlite.create({
			name: 'data.db',
			location: 'default'
    })

    this.database.executeSql(`PRAGMA foreign_keys = ON;`, null).catch(console.error)
    
    await this.database.executeSql(`CREATE TABLE IF NOT EXISTS wallet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL);`, null).catch(console.error)

    this.database.executeSql(`CREATE TABLE IF NOT EXISTS cashflow (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      walletId INT NOT NULL,
      date INT NOT NULL,
      amount INT NOT NULL,
      source TEXT NOT NULL,
      resultingMoney INT NOT NULL,
      FOREGIN KEY walletId REFERENCES wallet (id) ON DELETE CASCADE);`, null)
      .catch(console.error)

    this.database.executeSql(`CREATE TABLE IF NOT EXISTS etc (
      id INTEGER PRIMARY KEY,
      activeWalletId INT NOT NULL);`, null).catch(console.error)

    const data = await this.database.executeSql(`PRAGMA user_version;`, null).catch(console.error)
    if (data.rows.item(0).user_version === 0) {
      const wallet: Wallet = new Wallet("Main")
      const insertData = await this.insertWallet(wallet)
      const values = [insertData.insertId]
      await this.database.executeSql('INSERT INTO etc VALUES (1, ?);', values).catch(console.error)
      this.database.executeSql(`PRAGMA user_version = 1;`, null).catch(console.error)
    }
	}


  // Cashflow

  insertCashflow(cashflow: Cashflow, walletId: number): Promise<any> {
		const values = [
      walletId,
			cashflow.date.valueOf(),
			cashflow.amount,
			cashflow.source,
			cashflow.resultingMoney
		]
		return this.database.executeSql(`INSERT INTO cashflow (walletId, date, amount, source, resultingMoney) 
      VALUES (?, ?, ?, ?, ?);`, values)
      .catch(console.error)

  }
    
  updateCashflowResultingMoney(cashflow: Cashflow): Promise<any> {
    const values = [
      cashflow.resultingMoney,
      cashflow.id
    ]
    return this.database.executeSql(`UPDATE cashflow SET resultingMoney = ? WHERE ID = ?;`, values)
      .catch(console.error)
  }

	getCashflows(walletId: number): Promise<any> {
    const values = [
      walletId
    ]
		return this.database.executeSql(`SELECT * FROM cashflow WHERE walletId = ? ORDER BY date DESC;`, values)
			.then(data => {
				const cashflows = []
        const item = data.rows.item
				for (let i = 0; i < data.rows.length; i++) {
					item(i).date = new Date(item(i).date)
          cashflows.push(item(i))
        }
				return cashflows
			})
			.catch(console.error)
	}

  // Wallet

	insertWallet(wallet: Wallet): Promise<any> {
		const values = [
      wallet.name
		]
		return this.database.executeSql(`INSERT INTO wallet (name) 
			VALUES (?);`, values)
			.catch(console.error)
  }

  deleteWallet(walletId: number): Promise<any> {
    const values = [
      walletId
    ]
    return this.database.executeSql(`DELETE FROM wallet WHERE id = ?;`, values)
      .catch(console.error)
  }

  getWallets(): Promise<any> {
		return this.database.executeSql(`SELECT * FROM wallet;`, null)
			.then(data => {
				const wallets = []
        const item = data.rows.item
        for (let i = 0; i < data.rows.length; i++) wallets.push(item(i))
				return wallets
			})
			.catch(console.error)
  }

  async activateWallet(walletId: number): Promise<any> {
    const values = [
      walletId
    ]
    await this.database.executeSql(`UPDATE etc SET activeWalletId = ? WHERE id = 1;`, values)
      .catch(console.error)
  }

  async getCurrentWalletId(): Promise<number> {
    const data = await this.database.executeSql('SELECT activeWalletId FROM etc WHERE id = 1;', null)
      .catch(console.error)
    return data.rows.item(0).activeWalletId
  }
  // Utility functions

	selectTable(table: String): Promise<any> {
		return this.database.executeSql(`SELECT * FROM ${table};`, null)
			.then(data => {
				const items = []
				const item = data.rows.item
				for (let i = 0; i < data.rows.length; i++) {
					items.push(item(i))
				}
				console.log(data.rows.length)
				console.log(table.toUpperCase(), items)
				return items
			})
			.catch(console.error)
	}

	dropTableCashflows() {
		return this.database.executeSql('DROP TABLE cashflow;', null)
	}
}
