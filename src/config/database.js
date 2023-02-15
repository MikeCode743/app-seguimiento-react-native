import {openDatabase} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';


export const db = SQLite.openDatabase(
  {
    name: 'seguimientoDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export const createTable = tableName => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName}` +
        ' (id INTEGER PRIMARY KEY AUTOINCREMENT, longitud TEXT, latitud TEXT );',
      [],
      (sqlTxn, result) => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table' + error.messages);
      },
    );
  });
};

export const addItem = (table, item, data) => {
  if (!data) {
    alert('Enter Data');
    return;
  }
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${table} (longitud, latitud) VALUES (?, ?)`,
      [data.longitud, data.latitud],
      (sqlTxn, result) => {
        console.log(
          `Data inserted successfully,  ${data.longitud} and ${data.latitud}`,
        );
      },
      error => {
        console.log('error inserting data' + error.messages);
      },
    );
  });
};

export const getItems = async (table, data) => {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${table} ORDER BY id DESC`,
        [],
        (transaction, res) => {
          let len = res.rows.length;
          let result = [];

          if (len > 0) {
            result = res.rows.raw();
          }
          resolve(result);
        },
        () => {
          reject(false)
          console.log('Error: database.js:78');
        },
      );
    });
  })  
};

export const getDBConnection = () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};
