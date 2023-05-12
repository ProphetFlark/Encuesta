const express = require("express");
const router = express.Router();

const encuestaSchema = require("../models/encuesta");
const userSchema = require("../models/users");

//creamos la ruta de la encuesta
router.post("/encuesta", (req, res) => {
  //creamos el metodo post que recibe la encuesta y devuelve un mensaje en json
  const encuesta = encuestaSchema(req.body);
  encuesta
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

//obtener todas las encuestas
router.get("/encuesta", (req, res) => {
  encuestaSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

//Obtener las encuestas por usuario
router.get("/encuesta/:id", (req, res) => {
  const { id } = req.params;
  encuestaSchema
    .findById({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.put("/encuesta/respuesta/:id", (req, res) => {
  const encuestaId = req.params.id;
  const usuario = req.body.usuario;
  const respuestas = req.body.respuestas;

  encuestaSchema
    .findById(encuestaId)
    .then((encuesta) => {
      if (!encuesta.respuestas || !Array.isArray(encuesta.respuestas)) {
        encuesta.respuestas = [];
      }

      const usuarioIndex = encuesta.respuestas.findIndex(
        (respuesta) => respuesta.usuario === usuario
      );

      if (usuarioIndex !== -1) {
        // Si el usuario ya ha respondido, actualiza sus respuestas
        encuesta.respuestas[usuarioIndex].respuestas = respuestas;
      } else {
        // Si es la primera vez que el usuario responde, agrega una nueva respuesta al array
        encuesta.respuestas.push({ usuario, respuestas });
      }

      encuesta
        .save()
        .then(() =>
          res.json({ mensaje: "Respuestas actualizadas correctamente " })
        )
        .catch((err) =>
          res
            .status(500)
            .json({ error: "Error al guardar las respuestas: " + err.message })
        );
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error al buscar la encuesta " + err.message })
    );
});

// ####################################################################
// ############################ Users #################################
// ####################################################################

//creamos la ruta del usuario
router.post("/user", (req, res) => {
  //creamos el metodo post que recibe al usuario y devuelve un mensaje en json
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

//obtener todos los usuarios
router.get("/user", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

//Obtener user por ID
router.get("/user/:email", (req, res) => {
  const { email } = req.params;
  userSchema
    .find({ email: email })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
