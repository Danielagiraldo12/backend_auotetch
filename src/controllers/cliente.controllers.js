// cliente.controllers.js

import { getConnection, sql } from "../database/connection.js";

export const getClientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.cliente");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewCliente = async (req, res) => {
  const { nombres, apellidos, direccion, telefono, email, documento_identidad, fecha_nacimiento } = req.body;

  if (nombres == null || apellidos == null || direccion == null || documento_identidad == null || fecha_nacimiento == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("nombres", sql.VarChar, nombres)
      .input("apellidos", sql.VarChar, apellidos)
      .input("direccion", sql.VarChar, direccion)
      .input("telefono", sql.VarChar, telefono)
      .input("email", sql.VarChar, email)
      .input("documento_identidad", sql.VarChar, documento_identidad)
      .input("fecha_nacimiento", sql.Date, fecha_nacimiento)
      .query(
        "INSERT INTO autotech.dbo.cliente (nombres, apellidos, direccion, telefono, email, documento_identidad, fecha_nacimiento) VALUES (@nombres, @apellidos, @direccion, @telefono, @email, @documento_identidad, @fecha_nacimiento)"
      );

    res.json({
      nombres,
      apellidos,
      direccion,
      telefono,
      email,
      documento_identidad,
      fecha_nacimiento,
      id: result.recordset[0].id_cliente,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



export const getClienteById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.cliente WHERE id_cliente = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Cliente not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteClienteById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.cliente WHERE id_cliente = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Cliente not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateClienteById = async (req, res) => {
  const { nombres, apellidos, direccion, telefono, email, documento_identidad, fecha_nacimiento } = req.body;

  if (nombres == null || apellidos == null || direccion == null || documento_identidad == null || fecha_nacimiento == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("nombres", sql.VarChar, nombres)
      .input("apellidos", sql.VarChar, apellidos)
      .input("direccion", sql.VarChar, direccion)
      .input("telefono", sql.VarChar, telefono)
      .input("email", sql.VarChar, email)
      .input("documento_identidad", sql.VarChar, documento_identidad)
      .input("fecha_nacimiento", sql.Date, fecha_nacimiento)
      .query(
        "UPDATE autotech.dbo.cliente SET nombres = @nombres, apellidos = @apellidos, direccion = @direccion, telefono = @telefono, email = @email, documento_identidad = @documento_identidad, fecha_nacimiento = @fecha_nacimiento WHERE id_cliente = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Cliente not found" });
    }

    return res.json({
      nombres,
      apellidos,
      direccion,
      telefono,
      email,
      documento_identidad,
      fecha_nacimiento,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
