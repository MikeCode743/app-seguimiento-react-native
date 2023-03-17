import SQLite from 'react-native-sqlite-storage';


export const db = SQLite.openDatabase(
  {
    name: 'seguimientoDB',
    location: 'default',
  },
  () => { },
  error => {
    console.error(error);
  },
);


