import { UserProvider } from "./context/UserContext";
import Encuesta from "./pages/Encuesta";
import Graphics from "./pages/Graphics";
import NewEncuesta from "./pages/NewEncuesta";
import { Inicio, Login, Register, NotFound } from "./pages/index";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="encuesta/:id" element={<Encuesta />} />
        <Route path="newEncuesta" element={<NewEncuesta />} />
        <Route path="/encuesta/:id/grafica" element={<Graphics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
