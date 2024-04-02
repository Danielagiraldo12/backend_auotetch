// recordatorio.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getRecordatorios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.recordatorio");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewRecordatorio = async (req, res) => {
  const { fecha, id_cliente, id_usuario } = req.body;

  if (fecha == null || id_cliente == null || id_usuario == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("fecha", sql.DateTime, fecha)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_usuario", sql.Int, id_usuario)
      .query(
        "INSERT INTO autotech.dbo.recordatorio (fecha, id_cliente, id_usuario) VALUES (@fecha, @id_cliente, @id_usuario); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      fecha,
      id_cliente,
      id_usuario,
      id: result.recordset[0].id_recordatorio,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getRecordatorioById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.recordatorio WHERE id_recordatorio = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Recordatorio not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteRecordatorioById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.recordatorio WHERE id_recordatorio = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Recordatorio not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateRecordatorioById = async (req, res) => {
  const { fecha, id_cliente, id_usuario } = req.body;

  if (fecha == null || id_cliente == null || id_usuario == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("fecha", sql.DateTime, fecha)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_usuario", sql.Int, id_usuario)
      .query(
        "UPDATE autotech.dbo.recordatorio SET fecha = @fecha, id_cliente = @id_cliente, id_usuario = @id_usuario WHERE id_recordatorio = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Recordatorio not found" });
    }

    return res.json({
      fecha,
      id_cliente,
      id_usuario,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
