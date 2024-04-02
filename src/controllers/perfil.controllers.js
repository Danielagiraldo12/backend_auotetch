// perfil.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getPerfiles = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.perfil");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewPerfil = async (req, res) => {
  const { descripcion_perfil } = req.body;

  if (descripcion_perfil == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the profile" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("descripcion_perfil", sql.NVarChar, descripcion_perfil)
      .query(
        "INSERT INTO autotech.dbo.perfil (descripcion_perfil) VALUES (@descripcion_perfil); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      descripcion_perfil,
      id: result.recordset[0].id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getPerfilById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.perfil WHERE id_perfil = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Perfil not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deletePerfilById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.perfil WHERE id_perfil = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Perfil not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updatePerfilById = async (req, res) => {
  const { descripcion_perfil } = req.body;

  if (descripcion_perfil == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the profile" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("descripcion_perfil", sql.NVarChar, descripcion_perfil)
      .query(
        "UPDATE autotech.dbo.perfil SET descripcion_perfil = @descripcion_perfil WHERE id_perfil = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Perfil not found" });
    }

    return res.json({
      descripcion_perfil,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

