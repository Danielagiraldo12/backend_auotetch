// reparacion.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getReparaciones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.reparacion");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewReparacion = async (req, res) => {
  const { id_estado, id_orden_trabajo } = req.body;

  if (id_estado == null || id_orden_trabajo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_estado", sql.Int, id_estado)
      .input("id_orden_trabajo", sql.Int, id_orden_trabajo)
      .query(
        "INSERT INTO autotech.dbo.reparacion (id_estado, id_orden_trabajo) VALUES (@id_estado, @id_orden_trabajo); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      id_estado,
      id_orden_trabajo,
      id: result.recordset[0].id_reparacion,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getReparacionById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.reparacion WHERE id_reparacion = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Reparacion not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteReparacionById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.reparacion WHERE id_reparacion = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Reparacion not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateReparacionById = async (req, res) => {
  const { id_estado, id_orden_trabajo } = req.body;

  if (id_estado == null || id_orden_trabajo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("id_estado", sql.Int, id_estado)
      .input("id_orden_trabajo", sql.Int, id_orden_trabajo)
      .query(
        "UPDATE autotech.dbo.reparacion SET id_estado = @id_estado, id_orden_trabajo = @id_orden_trabajo WHERE id_reparacion = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Reparacion not found" });
    }

    return res.json({
      id_estado,
      id_orden_trabajo,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
