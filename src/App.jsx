import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Bienvenida from "./pages/Bienvenida";

import OferentesPorPuesto from "./pages/OferentesPorPuesto";
import OferenteDetalle from "./pages/OferenteDetalle";
import Postulacion from "./pages/Postulacion";
import SeleccionarPuesto from "./pages/SeleccionarPuesto";

import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/bienvenida"
          element={
            <RutaProtegida>
              <Bienvenida />
            </RutaProtegida>
          }
        />

        <Route
          path="/oferentes/por-puesto"
          element={<OferentesPorPuesto />}
        />

        <Route
          path="/oferentes/detalle"
          element={<OferenteDetalle />}
        />

        <Route
          path="/oferentes/seleccionar-puesto"
          element={<SeleccionarPuesto />}
        />

        <Route
          path="/oferentes/postulacion"
          element={<Postulacion />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;