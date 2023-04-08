import { db } from '../config/database';

export const createTableMarcadores = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_marcadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT, 
            icono TEXT
            );`,
            [],
            (sqlTxn, result) => {
            },
            error => {
            },
        );
    });
};

export const getMarcadoresDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM tbl_marcadores;`,
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
                    reject(false);
                },
            );
        });
    });
};

export const storeCatalogoMarcadores = (marcadores) => {
    const sql = marcadores.substring(0, marcadores.length - 1)

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO tbl_marcadores (id, nombre, icono) VALUES ${sql} ;`,
                [],
                (sqlTxn, result) => {
                    resolve(result)
                },
                error => {
                    reject(error)
                },
            );
        });

    });
};