import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const { createUser } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      Register
      <Formik
        initialValues={{
          email: "",
          contraseña: "",
          fechanac: "",
          genero: "",
          civil: "",
          escolaridad: "",
          role: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Formato de email incorrecto")
            .required("El Email es necesario"),
          contraseña: Yup.string().required("Es necesario una contraseña"),
          fechanac: Yup.date().required(
            "Es necesario una fecha en formato año-mes-día"
          ),
          genero: Yup.string().required(
            "Es necesario que seleccione su género"
          ),
          civil: Yup.string().required(
            "Es necesario que seleccione su estado civil"
          ),
          escolaridad: Yup.string().required(
            "Es necesario que seleccione su escolaridad"
          ),
        })}
        onSubmit={async (values) => {
          await createUser(values);
          navigate("/");
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="email" placeholder="Correo Electrónico" />
            <ErrorMessage component="p" name="email" />
            <Field name="contraseña" placeholder="Contraseña" />
            <ErrorMessage component="p" name="contraseña" />
            <Field name="fechanac" placeholder="Fecha" />
            <ErrorMessage component="p" name="fechanac" />
            <div id="group">Género: {values.genero}</div>
            <ErrorMessage component="p" name="genero" />
            <div role="group" aria-labelledby="group">
              <label>
                <Field type="radio" name="genero" value="Hombre" />
                Hombre
              </label>
              <label>
                <Field type="radio" name="genero" value="Mujer" />
                Mujer
              </label>
            </div>
            <div id="group2">Estado Civil: {values.civil}</div>
            <ErrorMessage component="p" name="civil" />
            <div role="group" aria-labelledby="group2">
              <label>
                <Field type="radio" name="civil" value="Casado/a" />
                Casado/a
              </label>
              <label>
                <Field type="radio" name="civil" value="Soltero/a" />
                Soltero/a
              </label>
            </div>
            <div id="group3">Escolaridad: {values.escolaridad}</div>
            <ErrorMessage component="p" name="escolaridad" />
            <div role="group" aria-labelledby="group3">
              <label>
                <Field type="radio" name="escolaridad" value="Bachillerato" />
                Bachillerato
              </label>
              <label>
                <Field type="radio" name="escolaridad" value="Universidad" />
                Universidad
              </label>
            </div>
            <button type="submit">Registrarse</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
