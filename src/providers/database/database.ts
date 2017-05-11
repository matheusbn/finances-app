import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Cashflow } from '../../model/cashflow';

@Injectable()
export class DatabaseProvider {

	database: SQLiteObject;

	constructor(private sqlite: SQLite) {
	}

	initialize(): Promise<any> {
		return this.sqlite.create({
			name: 'data.db',
			location: 'default'
		})
			.then((db: SQLiteObject) => {
				this.database = db;
				return this.database.executeSql(`CREATE TABLE IF NOT EXISTS cashflows(
						date INT,
						amount INT,
						type TEXT,
						resultingMoney INT);`, {})
					.catch(error => console.error(error));
			})
			.catch(error => console.error(error));
	}

	insertCashflow(cashflow: Cashflow): Promise<any> {
		let values = [
			cashflow.date.valueOf(),
			cashflow.amount,
			cashflow.type,
			cashflow.resultingMoney
		];
		return this.database.executeSql(`INSERT INTO cashflows (date, amount, type, resultingMoney) 
			VALUES (?, ?, ?, ?)`, values)
			.catch(error => console.error(error));
	}

	getCashflows(): Promise<Cashflow[]> {
		return this.database.executeSql(`SELECT * FROM cashflows`, {})
			.then(data => {
				let cashflows = [];
				let item = data.rows.item;
				for (let i = 0; i < data.rows.length; i++) {
					item(i).date = new Date(item(i).date);
					cashflows.push(item(i));
				}
				return cashflows;
			})
			.catch(error => console.error(error));
	}



	getDataFrom(table: String): Promise<any> {
		return this.database.executeSql(`SELECT * FROM ${table}`, {})
			.then(data => {
				let items = [];
				let item = data.rows.item;
				for (let i = 0; i < data.rows.length; i++) {
					items.push(item(i));
				}
				console.log(data.rows.length);
				console.log(items);
				return items;
			})
			.catch(error => console.error(error));
	}

	dropTableCashflows() {
		return this.database.executeSql('DROP TABLE cashflows;', {});
	}
}
