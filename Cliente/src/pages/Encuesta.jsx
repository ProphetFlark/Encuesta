import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Cargando from "../components/Cargando";
import { useNavigate } from "react-router-dom";
import TipoPregunta from "../components/TipoPregunta";

const Encuesta = () => {
  const {
    getUnicaEncuestaFunction,
    unicaencuesta,
    users,
    resFinEncuesta,
    setResFinEncuesta,
    AddRespuestasEncuesta,
  } = useUser();

  const id = document.URL;
  const indice = id.split("/").at(-1);

  const navigate = useNavigate();

  const [carga, setcarga] = useState(false);
  const [resultadoJSON, setResultadoJSON] = useState(null);

  useEffect(() => {
    getUnicaEncuestaFunction(indice);
    if (unicaencuesta !== undefined) {
      setcarga(true);
      setResFinEncuesta(Array(unicaencuesta.preguntas.length).fill([]));
    }
  }, []);

  useEffect(() => {
    setResultadoJSON({
      usuario: users[0].email,
      respuestas: resFinEncuesta,
    });
  }, [resFinEncuesta]);

  const handleRespuestaChange = (index, respuesta) => {
    setResFinEncuesta((prevResFinEncuesta) => {
      const updatedResFinEncuesta = [...prevResFinEncuesta];
      updatedResFinEncuesta[index] = respuesta;
      return updatedResFinEncuesta;
    });
  };

  const mandarRepuesta = async (Datos) => {
    await AddRespuestasEncuesta(indice, Datos)
      .then(() => {
        alert("Se ha mandado o actualizado su respuesta");
        navigate("/inicio");
      })
      .catch((err) => {
        alert("Ha habido un problema guardando las respuestas" + err.message);
      });
  };

  const handleViewGraphics = () => {
    navigate(`/encuesta/${indice}/grafica`);
  };

  return (
    <div>
      {!carga ? (
        <Cargando />
      ) : (
        <>
          {users[0].role ? (
            <button onClick={handleViewGraphics}>
              Ver grafica de encuesta
            </button>
          ) : null}
          Encuesta
          <h1>{unicaencuesta.titulo}</h1>
          <h2>{unicaencuesta.propietario}</h2>
          <h3>{unicaencuesta.descripcion}</h3>
          {unicaencuesta.preguntas.map((pregunta, index) => (
            <TipoPregunta
              key={pregunta._id}
              pregunta={pregunta}
              propietario={unicaencuesta.propietario}
              onRespuestaChange={(respuesta) =>
                handleRespuestaChange(index, respuesta)
              }
            />
          ))}
          <button onClick={() => mandarRepuesta(resultadoJSON)}>
            Enviar respuestas
          </button>
        </>
      )}
    </div>
  );
};

export default Encuesta;
