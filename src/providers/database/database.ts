import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Cashflow } from '../../model/cashflow';

@Injectable()
export class DatabaseProvider {

	database: SQLiteObject;

	constructor(platform: Platform, private sqlite: SQLite) {
	}

	initialize(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.sqlite.create({
				name: 'data.db',
				location: 'default'
			})
				.then( (db: SQLiteObject) => {
					this.database = db;
					this.database.executeSql(`CREATE TABLE IF NOT EXISTS cashflows(
						date INT,
						amount INT,
						type TEXT,
						resultingMoney INT);`, {})
						.then(data => resolve(data))
						.catch(error => reject(error))
				})
				.catch(error => reject(error));
		});
	}

	insertCashflow(cashflow: Cashflow): Promise<any> {
		let values = [
			cashflow.date.valueOf(),
			cashflow.amount,
			cashflow.type,
			cashflow.resultingMoney
		];
		return new Promise((resolve, reject) => {
			this.database.executeSql(`INSERT INTO cashflows (date, amount, type, resultingMoney) 
				VALUES (?, ?, ?, ?)`, values)
				.then(data => resolve(data))
				.catch(error => reject(error));
		});
	}

	getCashflows(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.database.executeSql(`SELECT * FROM cashflows`, {})
			.then(data => {
				let cashflows = [];
				let item = data.rows.item;
				for(let i = 0; i < data.rows.length; i++) {
					item(i).date = new Date(item(i).date);
					cashflows.push(item(i));
				}
				resolve(cashflows);
			})
			.catch(error => reject(error));
		});
	}




	getDataFrom(table: String): Promise<any> {
		// this.database.executeSql('DROP TABLE cashflows;', {});
		return new Promise((resolve, reject) => {
			this.database.executeSql(`SELECT * FROM ${table}`, {})
			.then(data => {
				let items = [];
				let item = data.rows.item;
				for(let i = 0; i < data.rows.length; i++) {
					items.push(item(i));
				}
				console.log(data.rows.length);
				console.log(items);
				resolve(items);
			})
			.catch(error => reject(error));
		});
	}
}
