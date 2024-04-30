// cliente.controllers.js

//En esta linea lo que se hace  es importar las funciones getConnection y sql del archivo connection.js
import { getConnection, sql } from "../database/connection.js";

// este es el metodo get clientes que trae todos losclientes desde la base de datos
// como se ve se hace un "SELECT * FROM autotech.dbo.cliente"
export const getmotos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.motos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
}; 

//este metodo crea un cliente en la base de datos
//de entrada tiene los siguientes parametros
// nombres, apellidos, direccion, telefono, email, documento_identidad, fecha_nacimiento 
export const createNewmotos = async (req, res) => {
    const { marca, modelo, color, placa, id_estado } = req.body;
  
  
  // aca se valida que los parametros para la creación del cliente no esten vacios
    if ( marca== null || modelo == null || color == null || placa == null || id_estado == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
    }
  
    try {
  
      //aca se crea el pool de conexion
      const pool = await getConnection();
       
      //aca se crea el request y se agregan los parametros y su respectivo sql
      //"INSERT INTO autotech.dbo.cliente (nombres, apellidos, direccion, telefono, email, documento_identidad, fecha_nacimiento) 
      // y aca asignamos los valores para el insert 
      //VALUES (@nombres, @apellidos, @direccion, @telefono, @email, @documento_identidad, @fecha_nacimiento)"
      const result = await pool
        .request()
        .input("marca", sql.VarChar, marca)
        .input("modelo", sql.VarChar, modelo)
        .input("color", sql.VarChar, color)
        .input("placa", sql.VarChar, placa)
        .input("id_estado", sql.VarChar, id_estado)
        .query(
          "INSERT INTO autotech.dbo.motos (marca, modelo, color, placa, id_estado) VALUES (@marca, @modelo, @color, @placa, @id_estado)"
        );
  
       // aca si el insert salio bien se devuelve este objeto creado con el ID  de ele cliente creado
      res.json({
        marca,
        modelo,
        color,
        placa,
        id_estado,
        id: result.recordset[0].id_estado
      });
    } catch (error) {   // si hay un error el devuelve un estatus 500 ( error del servidor)
      res.status(500).send(error.message);
    }
  };


  //aca esta consultando un cliente por su ID
export const getmotosById = async (req, res) => {
    try {
      // Aca crea el pool de conexion
      const pool = await getConnection();
      
      // aca crea el request y ingresa el parametro id ejecutando esta consulta
      //SELECT * FROM autotech.dbo.cliente WHERE id_cliente = @id ( el @id es el parametro de entrada)
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("SELECT * FROM autotech.dbo.motos WHERE id = @id");
      
        // sino encontro niguna devuelve el 404 que es no encontro nada 
      if (result.recordset.length === 0) {
        return res.status(404).json({ msg: "Cliente no encontrado" });
      }
       
      // y aca restorna el objeto del cliente encontrado
      return res.json(result.recordset[0]);
      
    } catch (error) {// si hay un error en esta consulta devuelve el error 500
      res.status(500).send(error.message);
    }
  };

  // este es el metodo que borra un clinte y le ingresa un ID
export const deletemotosById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("DELETE FROM autotech.dbo.motos WHERE id = @id");
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ msg: "Cliente not found" });
      }
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  


  // ACA ES ACTUALIZACIÓN DEL CLIENTE
// entra con los soguientes parametros 
//nombres, apellidos, direccion, telefono, email, documento_identidad, fecha_nacimiento
export const updatemotosById = async (req, res) => {
    const { marca, modelo, color, placa, id_estado } = req.body;
  
    if (marca == null || modelo == null || color == null || placa == null || id_estado == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
    }
  
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .input("marca", sql.VarChar, marca)
        .input("modelo", sql.VarChar, modelo)
        .input("color", sql.VarChar, color)
        .input("placa", sql.VarChar, placa)
        .input("id_estado", sql.VarChar, id_estado)
        .query(
          "UPDATE autotech.dbo.motos SET marca = @marca, modelo = @modelo, color = @color, placa = @placa, id_estado = @id_estado WHERE id = @id"
        );
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ msg: "Cliente not found" });
      }
  
      return res.json({
        marca,
        modelo,
        color,
        placa,
        id_estado,
        id: req.params.id,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  