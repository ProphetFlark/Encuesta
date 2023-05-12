import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const NewEncuesta = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [propietario, setPropietario] = useState("");

  const { users, agregarNuevaEncuestaFinal } = useUser();
  useEffect(() => {
    setPropietario(users[0].email);
  }, []);

  const handleAddPregunta = (tipo) => {
    const nuevaPregunta = {
      tipo: tipo,
      texto: "",
      opciones: tipo === "vf" ? ["Falso", "Verdadero"] : [],
      respuestas: [],
    };
    setPreguntas([...preguntas, nuevaPregunta]);
  };

  const handleTextoPreguntaChange = (indice, texto) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[indice].texto = texto;
    setPreguntas(updatedPreguntas);
  };

  const handleAddOpcion = (indice) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[indice].opciones.push("");
    setPreguntas(updatedPreguntas);
  };

  const handleTextoOpcionChange = (preguntaIndice, opcionIndice, texto) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[preguntaIndice].opciones[opcionIndice] = texto;
    setPreguntas(updatedPreguntas);
  };

  const handleCheckboxChange = (preguntaIndice, opcionIndice) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[preguntaIndice].respuestas[opcionIndice] =
      !updatedPreguntas[preguntaIndice].respuestas[opcionIndice];

    // Actualizar el array de respuestas con valores 1 y 0
    updatedPreguntas[preguntaIndice].respuestas = updatedPreguntas[
      preguntaIndice
    ].opciones.map((opcion, index) => {
      return updatedPreguntas[preguntaIndice].respuestas[index] ? 1 : 0;
    });

    setPreguntas(updatedPreguntas);
  };

  const handleGuardarRespuestas = async () => {
    const respuestasArray = preguntas.map((pregunta) => {
      return {
        tipo: pregunta.tipo,
        texto: pregunta.texto,
        opciones: pregunta.opciones,
        respuestas: pregunta.respuestas.map((respuesta) => (respuesta ? 1 : 0)),
      };
    });
    const encuestaObjeto = {
      titulo: titulo,
      propietario: propietario,
      descripcion: descripcion,
      preguntas: respuestasArray,
    };
    setRespuestas(encuestaObjeto);
    console.log(encuestaObjeto);
    await agregarNuevaEncuestaFinal(encuestaObjeto);
  };

  const handleTitulo = (evento) => {
    setTitulo(evento.target.value);
  };

  const handleDescripcion = (evento) => {
    setDescripcion(evento.target.value);
  };

  const handleVFRespuestaChange = (preguntaIndice, respuestaIndice) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[preguntaIndice].respuestas = [
      respuestaIndice === 0 ? 1 : 0,
      respuestaIndice,
    ];
    setPreguntas(updatedPreguntas);
  };

  return (
    <div>
      <h1>Nueva Encuesta</h1>
      <p>
        Encuesta propiedad de: <b>{propietario}</b>
      </p>
      <input placeholder="Título de la encuesta" onChange={handleTitulo} />
      <span> - </span>
      <input placeholder="Descripción" onChange={handleDescripcion} />
      <br />
      <br />
      <button onClick={() => handleAddPregunta("opciones")}>
        Agregar Opción Múltiple
      </button>
      <span> - </span>
      <button onClick={() => handleAddPregunta("vf")}>
        Agregar Verdadero y Falso
      </button>
      <hr />
      {preguntas.map((pregunta, indice) => (
        <div key={indice} style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}>
          <input
            type="text"
            placeholder="Escriba la pregunta"
            value={pregunta.texto}
            onChange={(e) => handleTextoPreguntaChange(indice, e.target.value)}
          />
          {pregunta.tipo === "opciones" && (
            <div>
              <h4>Opciones:</h4>
              {pregunta.opciones.map((opcion, opcionIndice) => (
                <div key={opcionIndice}>
                  <input
                    type="text"
                    placeholder={`Opción ${opcionIndice + 1}`}
                    value={opcion}
                    onChange={(e) =>
                      handleTextoOpcionChange(
                        indice,
                        opcionIndice,
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="checkbox"
                    checked={pregunta.respuestas[opcionIndice]}
                    onChange={() => handleCheckboxChange(indice, opcionIndice)}
                  />
                </div>
              ))}
              <button onClick={() => handleAddOpcion(indice)}>
                Agregar opción
              </button>
            </div>
          )}
          {pregunta.tipo === "vf" && (
            <div>
              <h3>Seleccione una opción:</h3>
              {pregunta.opciones.map((opcion, opcionIndice) => (
                <label key={opcionIndice}>
                  <input
                    type="radio"
                    name={`pregunta-${indice}`}
                    value={opcionIndice}
                    onChange={() =>
                      handleVFRespuestaChange(indice, opcionIndice)
                    }
                  />
                  {opcion}
                </label>
              ))}
            </div>
          )}
          <hr />
        </div>
      ))}
      <button onClick={handleGuardarRespuestas}>Guardar respuestas</button>
    </div>
  );
};

export default NewEncuesta;
