// vehiculo.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getVehiculos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.vehiculo");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewVehiculo = async (req, res) => {
    const { id_cliente, modelo, marca, color, placa, id_estado = 1 } = req.body;
  
    if (id_cliente == null || modelo == null || marca == null || color == null || placa == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id_cliente", sql.Int, id_cliente)
        .input("modelo", sql.VarChar, modelo)
        .input("marca", sql.VarChar, marca)
        .input("color", sql.VarChar, color)
        .input("placa", sql.VarChar, placa)
        .input("id_estado", sql.VarChar, id_estado)
        .query(
          "INSERT INTO autotech.dbo.vehiculo (id_cliente, modelo, marca, color, placa, id_estado) VALUES (@id_cliente, @modelo, @marca, @color, @placa, @id_estado); SELECT SCOPE_IDENTITY() as id"
        );
  
      res.json({
        id_cliente,
        modelo,
        marca,
        color,
        placa,
        id_estado,
        id: result.recordset[0].id,
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const getVehiculoById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("SELECT * FROM autotech.dbo.vehiculo WHERE id_vehiculo = @id");
  
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const deleteVehiculoById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("DELETE FROM autotech.dbo.vehiculo WHERE id_vehiculo = @id");
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const updateVehiculoById = async (req, res) => {
    const { id_cliente, modelo, marca, color, placa, id_estado } = req.body;
  
    if (id_cliente == null || modelo == null || marca == null || color == null || placa == null || id_estado == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id_cliente", sql.Int, id_cliente)
        .input("modelo", sql.VarChar, modelo)
        .input("marca", sql.VarChar, marca)
        .input("color", sql.VarChar, color)
        .input("placa", sql.VarChar, placa)
        .input("id_estado", sql.VarChar, id_estado)
        .query(
          "UPDATE autotech.dbo.vehiculo SET id_cliente = @id_cliente, modelo = @modelo, marca = @marca, color = @color, placa = @placa, id_estado = @id_estado WHERE id_vehiculo = @id"
        );
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      res.json({
        id_cliente,
        modelo,
        marca,
        color,
        placa,
        id_estado,
        id: req.params.id,
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };