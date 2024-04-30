// reportes.controllers.js

//En esta linea lo que se hace  es importar las funciones getConnection y sql del archivo connection.js
import { getConnection, sql } from "../database/connection.js";

// este es el metodo get clientes que trae todos losclientes desde la base de datos
// como se ve se hace un "SELECT * FROM autotech.dbo.cliente"
//reporte de stock
export const getProductosSinStock = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("select p.codigo,  p.descripcion , p.cantidad , p.imagen from autotech.dbo.producto p where p.cantidad <=5 and p.id_estado =1");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
}; 


//reporte de historial de vehiculos por placa y fechas
export const getHistorialVehiculoxPlacaxFechas = async (req, res) => {

    const { placa, fecha_inicio, fecha_fin } = req.body;// las fechas deben tener este formato YYYY-MM-DD ('2023-01-01')

    // aca se valida que los parametros para la creación del cliente no esten vacios
      if (placa == null || fecha_inicio == null || fecha_fin == null ) {
        return res.status(400).json({ msg: "Bad Request. Please fill all required fields (faltan parametros)" });
      }
    

      try {
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("placa", sql.VarChar, placa)
        .input("fecha_inicio", sql.Date, fecha_inicio)
        .input("fecha_fin", sql.Date, fecha_fin)
        .query("SELECT " + 
            "v.placa, " + 
            "CONCAT(c.nombres, ' ', c.apellidos) AS nombre_completo, " + 
            "r.fecha, " + 
            "r.descripcion_requerimiento AS requerimiento, " + 
            "o.descripcion AS trabajo_realizado " + 
            "FROM " + 
            "vehiculo v " + 
            "LEFT JOIN cliente c ON c.id_cliente = v.id_cliente " + 
            "LEFT JOIN requerimiento r ON c.id_cliente = r.id_cliente " + 
            "LEFT JOIN orden_trabajo o ON o.id_requerimiento = r.id_requerimiento " + 
            "WHERE " + 
            "UPPER(v.placa) = UPPER(@placa) " + 
            "AND r.fecha BETWEEN @fecha_inicio AND @fecha_fin ");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
  }; 