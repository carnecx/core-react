import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validarToken } from "../services/authService";

function RutaProtegida({ children }) {
  const [validando, setValidando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      const token = localStorage.getItem("token");

      // si no existe token, no permite el acceso
      if (!token) {
        setAutorizado(false);
        setValidando(false);
        return;
      }

      // consulta Api.Auth para comprobar el token
      const respuesta = await validarToken(token);

      if (respuesta?.exito) {
        setAutorizado(true);
      } else {
        // elimina los datos si el token ya no es valido
        localStorage.removeItem("token");
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("nombreCompleto");
        localStorage.removeItem("rol");

        setAutorizado(false);
      }

      setValidando(false);
    };

    comprobarToken();
  }, []);

  if (validando) {
    return <p>Validando sesión...</p>;
  }

  if (!autorizado) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;