import { db } from '../config/database';

export const createTableIncidentes = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_incidente (
            id INTEGER,
            nombre TEXT, 
            icono TEXT
            );`,
            [],
            (sqlTxn, result) => {
                console.log('Table created successfully tbl_incidente');
            },
            error => {
                console.log('Error creating table ' + JSON.stringify(error));
            },
        );
    });
};

export const getIncidentesDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM tbl_incidente;`,
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

export const storeCatalogoIncidentes = (incidentes) => {
    const sql = incidentes.substring(0, incidentes.length - 1)

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO tbl_incidente (id, nombre, icono) VALUES ${sql} ;`,
                [],
                (sqlTxn, result) => {
                    console.log("🚀 ~ file: TblDesplazamientos.jsx:40 ~ addItemDesplazamiento ~ result:", result)
                    resolve(result)
                },
                error => {
                    console.error('error inserting data ' + JSON.stringify(error));
                    reject(error)
                },
            );
        });

    });
};

export const createTableReporteIncidentes = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tbl_reporte_incidente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            desplazamiento_id TEXT, 
            id_incidente INTEGER,
            nombre TEXT,
            icono TEXT,
            longitud TEXT, 
            latitud TEXT, 
            altitud TEXT, 
            fecha_reporte TEXT,
            enviado INTEGER DEFAULT 0
            );`,
            [],
            (sqlTxn, result) => {
                console.log('Table created successfully tbl_reporte_incidente');
            },
            error => {
                console.log('Error creating table ' + JSON.stringify(error));
            },
        );
    });
};

export const getReporteIncidentesDatabase = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM tbl_reporte_incidente ORDER BY id DESC limit 15;`,
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

export const storeReporteIncidente = (data) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO tbl_reporte_incidente (desplazamiento_id, id_incidente, nombre, icono, longitud, latitud, altitud, fecha_reporte) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                [data.desplazamiento_id, data.id_incidente, data.nombre, data.icono, data.longitud, data.latitud, data.altitud, data.fecha_reporte],
                (sqlTxn, result) => {
                    resolve(result)
                },
                error => {
                    console.error('error inserting data ' + JSON.stringify(error));
                    reject(error)
                },
            );
        });
    });
}

export const deleteReporteIncidente = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM tbl_reporte_incidente WHERE id = ?;`,
                [id],
                (sqlTxn, result) => {
                    resolve(result)
                },
                error => {
                    console.error('error inserting data ' + JSON.stringify(error));
                    reject(error)
                },
            );
        });

    });
}

export const enviarIncidente = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE tbl_reporte_incidente
                SET enviado = 1
                WHERE id = ?;`,
                [id],
                (transaction, res) => {
                    console.log("🚀 ~ file: TblDesplazamientos.jsx:81 ~ returnnewPromise ~ res:", res)
                    resolve(res);
                },
                () => {
                    reject(false);
                },
            );
        });
    });
};

export const dropIncidentes = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                DELETE FROM tbl_incidente;
                `,
                [],
                (transaction, res) => {
                    console.log("🚀 ~ file: TblIncidentes.jsx:182 ~ returnnewPromise ~ res:", res)
                    resolve(res);
                },
                () => {
                    reject(false);
                },
            );
        });
    });
}
