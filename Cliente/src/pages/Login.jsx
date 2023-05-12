import { useUser } from "../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Login = () => {
  const { users, setUser, getUserLogin } = useUser();
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          contraseña: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Formato de email incorrecto")
            .required("El Email es necesario"),
          contraseña: Yup.string().required("Es necesario una contraseña"),
        })}
        onSubmit={async (values) => {
          await getUserLogin(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="email" placeholder="Correo Electrónico" />
            <Field name="contraseña" placeholder="Contraseña" />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
      <Link to={"/register"}>Regístrate</Link>
    </div>
  );
};

export default Login;
