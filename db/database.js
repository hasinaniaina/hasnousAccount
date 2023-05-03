import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('compte.db');
const createDatabase = () => {
    return db;
}


const createTable = () => {
    db.transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS "products" (
                "id"	INTEGER NOT NULL UNIQUE,
                "name" TEXT,
                "price"	TEXT,
                "used_quantity"	TEXT,
                "container_weight"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            );`,
            [],
            (txObj, resultSet) => {
                // console.log(resultSet)
            },
            (txObj, error) => {
                console.log(error);
                return false;
            }
        ),


        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS  "benefi_already_exist" (
                "id" INTEGER NOT NULL UNIQUE,
                "amount" TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            );`,
            [],
            (txObj, resultSet) => {
                // console.log(resultSet)
            },
            (txObj, error) => {
                console.log(error);
                return false;
            }
        ),

        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS  "recipe" (
                "id" INTEGER NOT NULL UNIQUE,
                "date" TEXT,
                "profit" TEXT,
                "spent"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            );`,
            [],
            (txObj, resultSet) => {
                // console.log(resultSet)
            },
            (txObj, error) => {
                console.log(error);
                return false;
            }
        )        
    });

}

exports.createDatabase =  createDatabase;
exports.createTable    =  createTable;