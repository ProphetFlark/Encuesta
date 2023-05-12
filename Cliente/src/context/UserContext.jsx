import { useState, createContext, useContext } from "react";
import {
  getUserRequest,
  createUserRequest,
  getEncuestas,
  getEncuestaByID,
  addRespuestaEncuestaRequest,
  addNewEncuestaRequest,
} from "../api/users";
import { useNavigate } from "react-router-dom";

//Aquí importamos el contexto de React en la variable userContext
const userContext = createContext();

//Aquí hacemos un hook personalizado para usar asignar nuestro contexto y retornarlo
export const useUser = () => {
  const context = useContext(userContext);
  return context;
};

//Aquí estamos exportando nuestro provider que nos sirve para almacenar toda la informacion que queremos que se comparta con toda la aplicación
export const UserProvider = ({ children }) => {
  const [users, setUser] = useState([]);
  const [encuestas, setEncuestas] = useState();
  const [unicaencuesta, setUnicaencuesta] = useState();
  const [resEncuesta, setResEncuesta] = useState([]);
  const [resFinEncuesta, setResFinEncuesta] = useState([]);

  const navigate = useNavigate();

  //Crear usuario
  const createUser = async (user) => {
    const res = await createUserRequest(user);
    setUser([...users, res.data]);
  };

  //obtener usuario por email
  const getUserLogin = async (user) => {
    const res = await getUserRequest(user.email);
    setUser(res.data);
    if (user.contraseña != res.data[0].contraseña) {
      // console.log("Contraseñas no coinciden");
    } else {
      // console.log("Contraseñas si coinciden");
      //SI EL USUARIO ESTA LOGUEADO MOSTRAR Y LLAMAR A LAS ENCUESTAS
      const encue = await getEncuestas();
      setEncuestas(encue.data);
      navigate("/inicio");
    }
  };

  //getEncuesta
  const getUnicaEncuestaFunction = async (id) => {
    const res = await getEncuestaByID(id);
    setUnicaencuesta(res.data);
  };

  //actualizar respuestas de encuesta
  const AddRespuestasEncuesta = async (id, respuestas) => {
    const res = await addRespuestaEncuestaRequest(id, respuestas);
    // setUser([...users, res.data]);
    console.log(res);
  };

  const agregarNuevaEncuestaFinal = async (encuesta) => {
    const res = await addNewEncuestaRequest(encuesta);
    console.log(res);
  };

  return (
    <userContext.Provider
      value={{
        users,
        getUserLogin,
        createUser,
        encuestas,
        unicaencuesta,
        getUnicaEncuestaFunction,
        resEncuesta,
        setResEncuesta,
        resFinEncuesta,
        setResFinEncuesta,
        AddRespuestasEncuesta,
        agregarNuevaEncuestaFinal,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
