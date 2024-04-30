import { config } from "dotenv"; // aca importamos el config de dotonev( paquete de angular)
config();


// Estas son las variables de conexión que manejamos desde el archivo para ser usadas en el pool de conecxion
export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || "sa";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Semeolvido1";
export const DB_SERVER = process.env.DB_SERVER || "localhost";
export const DB_DATABASE = process.env.DB_DATABASE || "autotech";