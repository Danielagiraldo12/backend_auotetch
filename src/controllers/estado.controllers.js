import { getConnection, sql } from "../database/connection.js";

export const getEstados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.estado");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewEstado = async (req, res) => {
  const { descripcion_estado } = req.body;

  if (descripcion_estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the state" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("descripcion_estado", sql.NVarChar, descripcion_estado)
      .query(
        "INSERT INTO autotech.dbo.estado (descripcion_estado) VALUES (@descripcion_estado); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      descripcion_estado,
      id: result.recordset[0].id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getEstadoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.estado WHERE id_estado = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Estado not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteEstadoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.estado WHERE id_estado = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Estado not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateEstadoById = async (req, res) => {
  const { descripcion_estado } = req.body;

  if (descripcion_estado == null) {
    return res.status(400).json({ msg: "Bad Request. Please provide a description for the state" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("descripcion_estado", sql.NVarChar, descripcion_estado)
      .query(
        "UPDATE autotech.dbo.estado SET descripcion_estado = @descripcion_estado WHERE id_estado = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Estado not found" });
    }

    return res.json({
      descripcion_estado,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
