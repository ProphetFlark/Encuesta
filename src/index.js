const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const encuestaRoutes = require("./routes/encuesta");

const port = process.env.PORT || 9000;

//MIDDLEWARES
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use("/api", encuestaRoutes);

// RUTAS
app.get("/", (req, res) => {
  res.send("API FUNCIONANDO EN EL MAIN");
});

//conexion a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a la BD de Mongo Atlas"))
  .catch((err) => console.log("Hubo un error: ", err));

app.listen(port, () => console.log("Server en", port));
