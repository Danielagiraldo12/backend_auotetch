// soporte.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getSoportes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.soporte");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewSoporte = async (req, res) => {
  const { fecha, id_cliente, id_usuario, descripcion_soporte } = req.body;

  if (fecha == null || id_cliente == null || id_usuario == null || descripcion_soporte == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("fecha", sql.Date, fecha)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_usuario", sql.Int, id_usuario)
      .input("descripcion_soporte", sql.VarChar, descripcion_soporte)
      .query(
        "INSERT INTO autotech.dbo.soporte (fecha, id_cliente, id_usuario, descripcion_soporte) VALUES (@fecha, @id_cliente, @id_usuario, @descripcion_soporte); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      fecha,
      id_cliente,
      id_usuario,
      descripcion_soporte,
      id: result.recordset[0].id_soporte,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSoporteById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.soporte WHERE id_soporte = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Soporte not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteSoporteById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.soporte WHERE id_soporte = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Soporte not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateSoporteById = async (req, res) => {
  const { fecha, id_cliente, id_usuario, descripcion_soporte } = req.body;

  if (fecha == null || id_cliente == null || id_usuario == null || descripcion_soporte == null) {
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
      .input("descripcion_soporte", sql.VarChar, descripcion_soporte)
      .query(
        "UPDATE autotech.dbo.soporte SET fecha = @fecha, id_cliente = @id_cliente, id_usuario = @id_usuario, descripcion_soporte = @descripcion_soporte WHERE id_soporte = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Soporte not found" });
    }

    return res.json({
      fecha,
      id_cliente,
      id_usuario,
      descripcion_soporte,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
