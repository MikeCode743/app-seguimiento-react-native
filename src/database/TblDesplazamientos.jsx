import {db} from '../config/database';

export const createTableDesplazamiento = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tbl_desplazamiento (
        uuid TEXT PRIMARY KEY,
        desplazamiento TEXT,
        enviado INTEGER,
        activo INTEGER,
        fecha_registro TEXT
        );`,
      [],
      (sqlTxn, result) => {
        console.log('Table created successfully tbl_desplazamiento');
      },
      error => {
        console.log('Error creating table ' + error[0]);
      },
    );
  });
};

export const addItemDesplazamiento = (data) => {
  if (!data) {
    alert('Enter Data');
    return;
  }
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO tbl_desplazamiento (uuid, desplazamiento, enviado, activo, fecha_registro) VALUES (?, ?, ?, ?, ?);`,
      [data.uuid, data.desplazamiento, 0, 1, data.fecha_registro],
      (sqlTxn, result) => {
        console.log("🚀 ~ file: TblDesplazamientos.jsx:40 ~ addItemDesplazamiento ~ result:", result)
      },
      error => {
        console.error('error inserting data ' + JSON.stringify(error));      },
    );
  });
};

export const getDesplazamientos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tbl_desplazamiento ORDER BY fecha_registro DESC LIMIT 15;`,
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


export const removeDesplazamiento = (uuid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM tbl_desplazamiento WHERE uuid = ?;`,
        [uuid],
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


export const sendDesplazamiento = (uuid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE tbl_desplazamiento
         SET enviado = 1
         WHERE uuid = ?;`,
        [uuid],
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

export const getLastDesplazamiento = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tbl_desplazamiento ORDER BY fecha_registro DESC LIMIT 1`,
        [],
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