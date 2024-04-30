// requerimiento.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getRequerimientos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.requerimiento");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewRequerimiento = async (req, res) => {
  const { fecha, id_cliente, id_usuario, id_estado, descripcion_requerimiento } = req.body;

  if (fecha == null || id_cliente == null || id_usuario == null || id_estado == null || descripcion_requerimiento == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("fecha", sql.Date, fecha)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_estado", sql.Int, id_estado)
      .input("descripcion_requerimiento", sql.VarChar, descripcion_requerimiento)
      .query(
        "INSERT INTO autotech.dbo.requerimiento (fecha, id_cliente, id_usuario, id_estado, descripcion_requerimiento) VALUES (@fecha, @id_cliente, @id_usuario, @id_estado, @descripcion_requerimiento); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      fecha,
      id_cliente,
      id_usuario,
      id_estado,
      descripcion_requerimiento
      ,id: result.recordset[0].id_requerimiento,
    });
  } catch (error) {

    res.status(500).send(error.message);
  }
};

export const getRequerimientoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.requerimiento WHERE id_requerimiento = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Requerimiento not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteRequerimientoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.requerimiento WHERE id_requerimiento = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Requerimiento not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateRequerimientoById = async (req, res) => {
  const { fecha, id_cliente, id_usuario, id_estado, descripcion_requerimiento } = req.body;

  if (fecha == null || id_cliente == null || id_usuario == null || id_estado == null || descripcion_requerimiento == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("fecha", sql.Date, fecha)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_estado", sql.Int, id_estado)
      .input("descripcion_requerimiento", sql.VarChar, descripcion_requerimiento)
      .query(
        "UPDATE autotech.dbo.requerimiento SET fecha = @fecha, id_cliente = @id_cliente, id_usuario = @id_usuario, id_estado = @id_estado, descripcion_requerimiento = @descripcion_requerimiento WHERE id_requerimiento = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Requerimiento not found" });
    }

    return res.json({
      fecha,
      id_cliente,
      id_usuario,
      id_estado,
      descripcion_requerimiento,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
