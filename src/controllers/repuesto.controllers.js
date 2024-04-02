// repuesto.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getRepuestos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.repuesto");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewRepuesto = async (req, res) => {
  const { id_reparacion, id_producto, cantidad } = req.body;

  if (id_reparacion == null || id_producto == null || cantidad == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id_reparacion", sql.Int, id_reparacion)
      .input("id_producto", sql.Int, id_producto)
      .input("cantidad", sql.Int, cantidad)
      .query(
        "INSERT INTO autotech.dbo.repuesto (id_reparacion, id_producto, cantidad) VALUES (@id_reparacion, @id_producto, @cantidad); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      id_reparacion,
      id_producto,
      cantidad,
      id: result.recordset[0].id_repuesto,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getRepuestoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.repuesto WHERE id_repuesto = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Repuesto not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteRepuestoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.repuesto WHERE id_repuesto = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Repuesto not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateRepuestoById = async (req, res) => {
  const { id_reparacion, id_producto, cantidad } = req.body;

  if (id_reparacion == null || id_producto == null || cantidad == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("id_reparacion", sql.Int, id_reparacion)
      .input("id_producto", sql.Int, id_producto)
      .input("cantidad", sql.Int, cantidad)
      .query(
        "UPDATE autotech.dbo.repuesto SET id_reparacion = @id_reparacion, id_producto = @id_producto, cantidad = @cantidad WHERE id_repuesto = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Repuesto not found" });
    }

    return res.json({
      id_reparacion,
      id_producto,
      cantidad,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
