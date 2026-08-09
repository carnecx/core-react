import { useNavigate } from "react-router-dom";

function Bienvenida() {
  const navigate = useNavigate();

  const nombreCompleto =
    localStorage.getItem("nombreCompleto") || "Usuario";

  const rol =
    localStorage.getItem("rol") || "Sin rol";

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("nombreCompleto");
    localStorage.removeItem("rol");

    navigate("/");
  };

  return (
    <div className="pagina-bienvenida">
      <div className="layout-core">

        <aside className="menu-lateral">
          <div className="menu-logo">
            <span className="nombre-sistema">
              CORE Servicios Médicos
            </span>
          </div>

          <nav className="menu-opciones">
            <a href="/bienvenida">
              Inicio
            </a>

            <a href="/oferentes/seleccionar-puesto">
              Puestos
            </a>
          </nav>
        </aside>

        <div className="area-derecha">

          <header className="header-core">
            <div className="header-usuario">

              <div className="usuario-avatar">
                {nombreCompleto.charAt(0).toUpperCase()}
              </div>

              <div className="usuario-informacion">
                <span className="usuario-nombre">
                  {nombreCompleto}
                </span>

                <span className="usuario-rol">
                  {rol}
                </span>
              </div>

              <button
                type="button"
                className="boton-logout"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>

            </div>
          </header>

          <main className="contenido-principal">

            <h1>Bienvenido</h1>

            <div className="mensaje-exito">
              <div>
                <strong>
                  Autenticación realizada correctamente.
                </strong>

                <p>
                  Bienvenido al sistema CORE Servicios Médicos.
                  Su sesión ha iniciado correctamente.
                </p>
              </div>
            </div>

            <div className="resumen-usuario">

              <div className="dato">
                <div>
                  <div className="titulo">
                    Usuario
                  </div>

                  <div className="valor">
                    {nombreCompleto}
                  </div>
                </div>
              </div>

              <div className="dato">
                <div>
                  <div className="titulo">
                    Rol
                  </div>

                  <div className="valor">
                    {rol}
                  </div>
                </div>
              </div>

            </div>

          </main>

          <footer className="footer-core">
            CORE Servicios Médicos
          </footer>

        </div>
      </div>
    </div>
  );
}

export default Bienvenida;