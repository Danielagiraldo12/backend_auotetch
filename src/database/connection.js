import sql from "mssql"; // aca importo la funcion sql de de este npm mssql
import { DB_DATABASE, DB_PASSWORD, DB_SERVER, DB_USER } from "../config.js"; // aca importo las variables de configuración para la conexión

// aca configuro la constante que utilizo para abrir el pool de conexión
export const dbSettings = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_DATABASE,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};


// aca creo una funcion que es asincronica la cual se le pasa por parametro la constante de conexión
// y esta función getconnectiion se exporta para ser importada en otros lados ( archvos)
export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

// se exporta esta función para ser usada en otros lados
export { sql };