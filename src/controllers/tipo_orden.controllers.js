// tipoOrden.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getTiposOrden = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.tipo_orden");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewTipoOrden = async (req, res) => {
  const { descripcion } = req.body;

  if (descripcion == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the order type" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("descripcion", sql.VarChar, descripcion)
      .query(
        "INSERT INTO autotech.dbo.tipo_orden (descripcion) VALUES (@descripcion); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      descripcion,
      id: result.recordset[0].id_tipo_orden,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTipoOrdenById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.tipo_orden WHERE id_tipo_orden = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Tipo de orden not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteTipoOrdenById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.tipo_orden WHERE id_tipo_orden = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Tipo de orden not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateTipoOrdenById = async (req, res) => {
  const { descripcion } = req.body;

  if (descripcion == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the order type" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("descripcion", sql.VarChar, descripcion)
      .query(
        "UPDATE autotech.dbo.tipo_orden SET descripcion = @descripcion WHERE id_tipo_orden = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Tipo de orden not found" });
    }

    return res.json({
      descripcion,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
