const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  fechanac: {
    type: Date,
    required: true,
  },
  genero: {
    type: String,
    enum: ["Hombre", "Mujer", "Prefiero no decirlo", "Camión"],
    required: true,
  },
  civil: {
    type: String,
    enum: [
      "Soltero/a",
      "Casado/a",
      "Divorciado/a",
      "Separado/a",
      "Unión libre",
      "Viudo/a",
    ],
    required: true,
  },
  escolaridad: {
    type: String,
    enum: [
      "Primaria",
      "Básico",
      "Diversificado",
      "Universidad",
      "Postgrado",
      "Doctorado",
      "Ninguna",
    ],
    required: true,
  },
  role: {
    type: Boolean,
    required: true,
  },
});

const user = mongoose.model("users", userSchema);

module.exports = user;
