import { db } from '../config/database';

export const createTableMediosDesplazamiento = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_medios_desplazamiento (
            id INTEGER,
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

export const getMediosDesplazamientosDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM tbl_medios_desplazamiento;`,
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

export const storeCatalogoMediosDesplazamientos = (medios_desplazamiento) => {
    const sql = medios_desplazamiento.substring(0, medios_desplazamiento.length - 1)

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO tbl_medios_desplazamiento (id, nombre, icono) VALUES ${sql} ;`,
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

export const dropMediosDesplazamientos = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                DELETE FROM tbl_medios_desplazamiento;
                `,
                [],
                (transaction, res) => {
                    resolve(res);
                },
                () => {
                    reject(false);
                },
            );
        });
    });
}
