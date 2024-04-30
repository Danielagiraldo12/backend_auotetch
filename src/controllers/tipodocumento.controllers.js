// tipodocumento.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getTiposDocumento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.tipodocumento");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewTipoDocumento = async (req, res) => {
  const { descripcion } = req.body;

  if (descripcion == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the document type" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("descripcion", sql.NVarChar, descripcion)
      .query(
        "INSERT INTO autotech.dbo.tipodocumento (descripcion) VALUES (@descripcion); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      descripcion,
      id: result.recordset[0].id_documento,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTipoDocumentoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.tipodocumento WHERE id_documento = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Tipo de documento not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteTipoDocumentoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.tipodocumento WHERE id_documento = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Tipo de documento not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateTipoDocumentoById = async (req, res) => {
  const { descripcion } = req.body;

  if (descripcion == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the document type" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("descripcion", sql.NVarChar, descripcion)
      .query(
        "UPDATE autotech.dbo.tipodocumento SET descripcion = @descripcion WHERE id_documento = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Tipo de documento not found" });
    }

    return res.json({
      descripcion,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
