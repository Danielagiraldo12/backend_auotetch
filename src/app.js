import express from "express";
import cors from "cors";
import morgan from "morgan";

// aca importamos todas las rutas creadas en routes 
import productRoutes from "./routes/products.routes.js";
import usuarioRoutes from "./routes/usuarios.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import vehiculoRoutes from "./routes/vehiculo.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import estadoRoutes from "./routes/estado.routes.js";
import perfilRoutes from "./routes/estado.routes.js";
import tipoDocumentoRoutes from "./routes/tipodocumento.routes.js";
import tipoOrdenRoutes from "./routes/tipo_orden.routes.js";
import recordatorioRoutes from "./routes/recordatorio.routes.js";
import repuestoRoutes from "./routes/respuesto.routes.js";
import soporteRoutes from "./routes/soporte.routes.js";
import requerimientoRoutes from "./routes/requerimiento.routes.js";
import reparacionRoutes from "./routes/reparacion.routes.js";
import ordenTrabajoRoutes from "./routes/ordenTrabajo.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";

//importo la ruta de mi ejemplo 



import motosRoutes from "./routes/motos.routes.js";



const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes 
app.use("/api", productRoutes);// este es el ejemplo  base

// estas son las rutas  para elconsumo de la aplicacion en el back
app.use("/api", usuarioRoutes);
app.use("/api", clienteRoutes);
app.use("/api", vehiculoRoutes);
app.use("/api", productoRoutes);// POR CADA ROUTES EXISTE UN CONTROLADOR CORRESPONDIENTE PARA EL LLAMADO DE LAS FUNCIONES
app.use("/api", estadoRoutes);
app.use("/api", perfilRoutes);
app.use("/api", tipoDocumentoRoutes);
app.use("/api", tipoOrdenRoutes);
app.use("/api",recordatorioRoutes);
app.use("/api",repuestoRoutes);
app.use("/api",soporteRoutes);
app.use("/api",requerimientoRoutes);
app.use("/api",reparacionRoutes);
app.use("/api",ordenTrabajoRoutes);
app.use("/api",reportesRoutes);

//ruta para mi ejemplo




app.use("/api",motosRoutes);

export default app;

