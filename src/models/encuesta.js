const mongoose = require("mongoose");

const encuestaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  propietario: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  preguntas: [
    {
      tipo: {
        type: String,
        enum: ["directa", "opciones", "vf"],
        required: true,
      },
      texto: {
        type: String,
        required: true,
      },
      opciones: [String],
      respuestas: [Boolean],
    },
  ],
  respuestas: [
    {
      usuario: {
        type: String,
        required: false,
      },
      respuestas: [[Number]],
    },
  ],
});

const Encuesta = mongoose.model("Encuesta", encuestaSchema);

module.exports = Encuesta;
