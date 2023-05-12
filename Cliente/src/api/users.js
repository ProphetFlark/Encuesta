import axios from "axios";
axios.defaults.baseURL = "http://localhost:9000";

//aqui obtenemos al user
export const getUserRequest = async (user) =>
  await axios.get(`api/user/${user}`);

//resolvemos todas las encuestas
export const getEncuestas = async () => await axios.get("api/encuesta");

//obtenermos la encuesta por ID
export const getEncuestaByID = async (id) =>
  await axios.get(`api/encuesta/${id}`);

//aqui mandamos por post al usuario
export const createUserRequest = async (user) =>
  await axios.post("api/user", user);

//Añadimos las respouestas por usuario o simplemete actualizamos
export const addRespuestaEncuestaRequest = async (id, respuestas) => {
  console.log(id);
  console.log(respuestas);
  await axios.put(`api/encuesta/respuesta/${id}`, respuestas);
};

//añadir nueva encuesta
export const addNewEncuestaRequest = async (encuesta) => {
  console.log(encuesta);
  await axios.post("api/encuesta", encuesta);
};