import sql from "mssql";
import { DB_DATABASE, DB_PASSWORD, DB_SERVER, DB_USER } from "../config.js";


var config = {  
  server: 'YARLIN\SQLEXPRESS',
  authentication: {
      type: 'default',
      options: {
          userName: 'admin',
          password: '123'
      }
  },
  options: {
      database: 'autotech',
      port: 3000  //your port number
  }
}; 
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

export const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };