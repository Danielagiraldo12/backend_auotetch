// ordenTrabajo.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getOrdenesTrabajo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.orden_trabajo");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewOrdenTrabajo = async (req, res) => {
  const { descripcion, id_estado, id_cliente, id_vehiculo, id_usuario, id_tipo_orden, id_soporte, id_requerimiento } = req.body;

  if (id_estado == null || id_cliente == null || id_vehiculo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("descripcion", sql.VarChar, descripcion)
      .input("id_estado", sql.Int, id_estado)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_vehiculo", sql.Int, id_vehiculo)
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_tipo_orden", sql.Int, id_tipo_orden)
      .input("id_soporte", sql.Int, id_soporte)
      .input("id_requerimiento", sql.Int, id_requerimiento)
      .query(
        "INSERT INTO autotech.dbo.orden_trabajo (descripcion, id_estado, id_cliente, id_vehiculo, id_usuario, id_tipo_orden, id_soporte, id_requerimiento) VALUES (@descripcion, @id_estado, @id_cliente, @id_vehiculo, @id_usuario, @id_tipo_orden, @id_soporte, @id_requerimiento); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      descripcion,
      id_estado,
      id_cliente,
      id_vehiculo,
      id_usuario,
      id_tipo_orden,
      id_soporte,
      id_requerimiento,
      id: result.recordset[0].id_orden_trabajo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getOrdenTrabajoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.orden_trabajo WHERE id_orden_trabajo = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Orden de trabajo not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteOrdenTrabajoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.orden_trabajo WHERE id_orden_trabajo = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Orden de trabajo not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateOrdenTrabajoById = async (req, res) => {
  const { descripcion, id_estado, id_cliente, id_vehiculo, id_usuario, id_tipo_orden, id_soporte, id_requerimiento } = req.body;

  if (id_estado == null || id_cliente == null || id_vehiculo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("descripcion", sql.VarChar, descripcion)
      .input("id_estado", sql.Int, id_estado)
      .input("id_cliente", sql.Int, id_cliente)
      .input("id_vehiculo", sql.Int, id_vehiculo)
      .input("id_usuario", sql.Int, id_usuario)
      .input("id_tipo_orden", sql.Int, id_tipo_orden)
      .input("id_soporte", sql.Int, id_soporte)
      .input("id_requerimiento", sql.Int, id_requerimiento)
      .query(
        "UPDATE autotech.dbo.orden_trabajo SET descripcion = @descripcion, id_estado = @id_estado, id_cliente = @id_cliente, id_vehiculo = @id_vehiculo, id_usuario = @id_usuario, id_tipo_orden = @id_tipo_orden, id_soporte = @id_soporte, id_requerimiento = @id_requerimiento WHERE id_orden_trabajo = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Orden de trabajo not found" });
    }

    return res.json({
      descripcion,
      id_estado,
      id_cliente,
      id_vehiculo,
      id_usuario,
      id_tipo_orden,
      id_soporte,
      id_requerimiento,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
