import { getConnection, sql } from "../database/connection.js";

export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM usuario");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const createNewUsuario = async (req, res) => {
    const { cedula, nombres, apellidos, celular, correo, direccion, id_tipo_documento, id_perfil, id_estado, login, password } = req.body;

    if (cedula == null || nombres == null || celular == null || id_perfil == null || id_estado == null || login == null || password == null) {
        return res.status(400).json({ msg: "Bad Request. Please fill all required fields" });
    }

    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("cedula", sql.Int, cedula)
            .input("nombres", sql.VarChar, nombres)
            .input("apellidos", sql.VarChar, apellidos)
            .input("celular", sql.VarChar, celular)
            .input("correo", sql.VarChar, correo)
            .input("direccion", sql.VarChar, direccion)
            .input("id_tipo_documento", sql.Int, id_tipo_documento)
            .input("id_perfil", sql.Int, id_perfil)
            .input("id_estado", sql.Int, id_estado)
            .input("login", sql.VarChar, login)
            .input("password", sql.VarChar, password)
            .query(
                "INSERT INTO usuario (cedula, nombres, apellidos, celular, correo, direccion, id_tipo_documento, id_perfil, id_estado, login, password) VALUES (@cedula, @nombres, @apellidos, @celular, @correo, @direccion, @id_tipo_documento, @id_perfil, @id_estado, @login, @password); SELECT SCOPE_IDENTITY() as id"
            );

        res.json({
            cedula,
            nombres,
            apellidos,
            celular,
            correo,
            direccion,
            id_tipo_documento,
            id_perfil,
            id_estado,
            login,
            password,
            id: result.recordset[0].id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateUsuarioById = async (req, res) => {
    const { id_usuario, cedula, nombres, apellidos, celular, correo, direccion, id_tipo_documento, id_perfil, id_estado, login, password } = req.body;

    if (id_usuario == null) {
        return res.status(400).json({ msg: "Bad Request. Please provide id_usuario to update" });
    }

    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id_usuario", sql.Int, id_usuario)
            .input("cedula", sql.Int, cedula)
            .input("nombres", sql.VarChar, nombres)
            .input("apellidos", sql.VarChar, apellidos)
            .input("celular", sql.VarChar, celular)
            .input("correo", sql.VarChar, correo)
            .input("direccion", sql.VarChar, direccion)
            .input("id_tipo_documento", sql.Int, id_tipo_documento)
            .input("id_perfil", sql.Int, id_perfil)
            .input("id_estado", sql.Int, id_estado)
            .input("login", sql.VarChar, login)
            .input("password", sql.VarChar, password)
            .query(
                "UPDATE usuario SET cedula = @cedula, nombres = @nombres, apellidos = @apellidos, celular = @celular, correo = @correo, direccion = @direccion, id_tipo_documento = @id_tipo_documento, id_perfil = @id_perfil, id_estado = @id_estado, login = @login, password = @password WHERE id_usuario = @id_usuario"
            );

        res.json({ msg: "Usuario updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const authenticateUsuario = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ msg: "Bad Request. Please provide login and password" });
    }

    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("login", sql.VarChar, login)
            .input("password", sql.VarChar, password)
            .query(
                "SELECT * FROM usuario WHERE login = @login AND password = @password"
            );

        if (result.recordset.length === 1) {
            // Si se encuentra el usuario, devolver los datos del usuario
            const usuario = result.recordset[0];
            res.json({ usuario });
        } else {
            // Si no se encuentra el usuario, devolver un mensaje indicando que no existe
            res.status(404).json({ msg: "Usuario not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteUsuarioById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("DELETE FROM usuario WHERE id_usuario = @id");
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };


  

  export const getUsuarioById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("SELECT * FROM usuario WHERE id_usuario = @id");
  
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };