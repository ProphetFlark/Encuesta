import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import CardEncuesta from "../components/CardEncuesta";
import Cargando from "../components/Cargando";
import "../components/CardEncuesta.css";

const Inicio = () => {
  const { users, encuestas } = useUser();
  const navigate = useNavigate();
  const [carga, setcarga] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      navigate("/");
    } else {
      setcarga(true);
    }
  }, [users, navigate]);

  const crearEncuesta = () => {
    navigate("/newEncuesta");
  };

  return (
    <div>
      {!carga ? (
        <Cargando />
      ) : (
        <>
          {users[0].role === true ? (
            <button
              onClick={() => {
                crearEncuesta();
              }}
            >
              Crear Encuesta
            </button>
          ) : null}
          Inicio de las encuestas
          <div className="cardpadre">
            {encuestas.map((encuesta) => (
              <CardEncuesta encuesta={encuesta} key={encuesta._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Inicio;
