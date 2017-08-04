import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Cashflow } from '../../model/cashflow';

@Injectable()
export class DatabaseProvider {

	database: SQLiteObject

	constructor(private sqlite: SQLite) {}

	initialize(): Promise<any> {
		return this.sqlite.create({
			name: 'data.db',
			location: 'default'
		})
			.then((db: SQLiteObject) => {
				this.database = db
				return this.database.executeSql(`CREATE TABLE IF NOT EXISTS cashflows (
						date INT,
						amount INT,
						type TEXT,
						resultingMoney INT);`, {})
					.catch(console.error)
			})
			.catch(console.error)
	}

	insertCashflow(cashflow: Cashflow): Promise<any> {
		const values = [
			cashflow.date.valueOf(),
			cashflow.amount,
			cashflow.type,
			cashflow.resultingMoney
		]
		return this.database.executeSql(`INSERT INTO cashflows (date, amount, type, resultingMoney) 
			VALUES (?, ?, ?, ?)`, values)
			.catch(console.error)
	}

	getCashflows(): Promise<any> {
		return this.database.executeSql(`SELECT * FROM cashflows`, {})
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



	selectTable(table: String): Promise<any> {
		return this.database.executeSql(`SELECT * FROM ${table}`, {})
			.then(data => {
				const items = []
				const item = data.rows.item
				for (let i = 0; i < data.rows.length; i++) {
					items.push(item(i))
				}
				console.log(data.rows.length)
				console.log(items)
				return items
			})
			.catch(console.error)
	}

	dropTableCashflows() {
		return this.database.executeSql('DROP TABLE cashflows;', {})
	}
}
