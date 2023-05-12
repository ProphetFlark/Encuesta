import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const TipoPregunta = ({ pregunta, onRespuestaChange }) => {
  const { resFinEncuesta } = useUser();

  const [checkboxes, setCheckboxes] = useState(
    Array(pregunta.opciones.length).fill(0)
  );
  const [toggleArray, setToggleArray] = useState(
    Array(pregunta.opciones.length).fill(0)
  );
  const [respuestaDirecta, setRespuestaDirecta] = useState("");

  useEffect(() => {
    const respuesta = obtenerRespuesta();
    onRespuestaChange(respuesta);
  }, [checkboxes, toggleArray, respuestaDirecta]);

  const obtenerRespuesta = () => {
    if (pregunta.tipo === "directa") {
      return respuestaDirecta;
    } else if (pregunta.tipo === "opciones") {
      return checkboxes;
    } else {
      return toggleArray;
    }
  };

  if (pregunta.tipo === "directa") {
    const handleRespuestaDirectaChange = (event) => {
      setRespuestaDirecta(event.target.value);
    };

    return (
      <>
        <h1>{pregunta.texto}</h1>
        <input
          placeholder="Coloque su respuesta"
          id="resDirecta"
          value={respuestaDirecta}
          onChange={handleRespuestaDirectaChange}
        />
        {/* <p>Respuesta: {respuestaDirecta}</p> */}
      </>
    );
  } else if (pregunta.tipo === "opciones") {
    const checkboxData = pregunta.opciones;

    const handleCheckboxChange = (index) => {
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = updatedCheckboxes[index] === 1 ? 0 : 1;
      setCheckboxes(updatedCheckboxes);
    };

    return (
      <div>
        <h1>{pregunta.texto}</h1>
        {checkboxData.map((label, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checkboxes[index] === 1}
              onChange={() => handleCheckboxChange(index)}
            />
            {label}
          </label>
        ))}
        {/* <p>Array: {checkboxes.join(", ")}</p> */}
      </div>
    );
  } else {
    const toggleData = pregunta.opciones;

    const handleToggleChange = (index) => {
      const updatedToggleArray = Array(toggleData.length).fill(0);
      updatedToggleArray[index] = 1;
      setToggleArray(updatedToggleArray);
    };

    return (
      <div>
        <h1>{pregunta.texto}</h1>
        {toggleData.map((label, index) => (
          <label key={index}>
            <input
              type="radio"
              checked={toggleArray[index] === 1}
              onChange={() => handleToggleChange(index)}
            />
            {label}
          </label>
        ))}
        <br />
        {/* <p>Array: {toggleArray.join(", ")}</p> */}
      </div>
    );
  }
};

export default TipoPregunta;
