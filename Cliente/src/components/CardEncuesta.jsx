import { Link } from "react-router-dom";
import "./CardEncuesta.css";

const CardEncuesta = ({ encuesta }) => {
  
  return (
    <Link to={`/encuesta/${encuesta._id}`} className="links">
      <div className="card">
        <h1>Título: {encuesta.titulo}</h1>
        <h4>Descripción: {encuesta.descripcion}</h4>
        <h3>Propietario: {encuesta.propietario}</h3>
      </div>
    </Link>
  );
};

export default CardEncuesta;
