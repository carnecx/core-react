import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setMensaje("");
    setCargando(true);

    try {
      const respuesta = await login(
        usuario.trim(),
        contrasena
      );

      if (respuesta.exito) {
        // guarda el token para utilizarlo en las demas api
        localStorage.setItem(
          "token",
          respuesta.token
        );

        // guarda los datos del usuario autenticado
        localStorage.setItem(
          "idUsuario",
          respuesta.idUsuario
        );

        localStorage.setItem(
          "nombreCompleto",
          respuesta.nombreCompleto ?? ""
        );

        localStorage.setItem(
          "rol",
          respuesta.rol ?? ""
        );

        // redirige a la pagina de bienvenida
        navigate("/bienvenida");
      } else {
        setMensaje(
          respuesta.mensaje ||
          "Usuario y/o contraseña incorrectos."
        );
      }
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible conectar con la API."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pagina-login">
      <main className="login-card">

        <h1>
          Core Servicios Médicos
        </h1>

        <h2>
          Ingreso al sistema Core
        </h2>

        {mensaje && (
          <div className="mensaje-error">
            {mensaje}
          </div>
        )}

        <form onSubmit={iniciarSesion}>

          <label htmlFor="usuario">
            Usuario
          </label>

          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            autoComplete="username"
            autoFocus
            required
          />

          <label htmlFor="contrasena">
            Contraseña
          </label>

          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) =>
              setContrasena(e.target.value)
            }
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={cargando}
          >
            {cargando
              ? "Ingresando..."
              : "Ingresar"}
          </button>

        </form>

      </main>
    </div>
  );
}

export default Login;