
import { getConnection, sql } from "../database/connection.js";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM autotech.dbo.producto");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  const { descripcion, marca, codigo, cantidad, precio_compra, precio_venta } = req.body;

  if (descripcion == null || marca == null || codigo == null || cantidad == null || precio_compra == null || precio_venta == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("descripcion", sql.VarChar, descripcion)
      .input("marca", sql.VarChar, marca)
      .input("codigo", sql.VarChar, codigo)
      .input("cantidad", sql.Int, cantidad)
      .input("precio_compra", sql.Decimal, precio_compra)
      .input("precio_venta", sql.Decimal, precio_venta)
      .query(
        "INSERT INTO autotech.dbo.producto (descripcion, marca, codigo, cantidad, precio_compra, precio_venta) VALUES (@descripcion, @marca, @codigo, @cantidad, @precio_compra, @precio_venta); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      descripcion,
      marca,
      codigo,
      cantidad,
      precio_compra,
      precio_venta,
      id: result.recordset[0].id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM autotech.dbo.producto WHERE id_producto = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM autotech.dbo.producto WHERE id_producto = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateProductById = async (req, res) => {
  const { descripcion, marca, codigo, cantidad, precio_compra, precio_venta } = req.body;

  if (descripcion == null || marca == null || codigo == null || cantidad == null || precio_compra == null || precio_venta == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("descripcion", sql.VarChar, descripcion)
      .input("marca", sql.VarChar, marca)
      .input("codigo", sql.VarChar, codigo)
      .input("cantidad", sql.Int, cantidad)
      .input("precio_compra", sql.Decimal, precio_compra)
      .input("precio_venta", sql.Decimal, precio_venta)
      .query(
        "UPDATE autotech.dbo.producto SET descripcion = @descripcion, marca = @marca, codigo = @codigo, cantidad = @cantidad, precio_compra = @precio_compra, precio_venta = @precio_venta WHERE id_producto = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.json({
      descripcion,
      marca,
      codigo,
      cantidad,
      precio_compra,
      precio_venta,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
