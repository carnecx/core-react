import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPuestosActivos } from "../services/puestosService";

// Core6: listado de puestos activos, protegido, con navegación hacia Core7
function ListadoPuestos() {
  const [puestos, setPuestos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const nombreCompleto = localStorage.getItem("nombreCompleto") || "Usuario";
  const rol = localStorage.getItem("rol") || "Sin rol";

  useEffect(() => {
    const cargarPuestos = async () => {
      try {
        const data = await getPuestosActivos();
        setPuestos(data);
      } catch {
        setError("No se pudieron cargar los puestos.");
      } finally {
        setCargando(false);
      }
    };
    cargarPuestos();
  }, []);

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
            <span className="nombre-sistema">CORE Servicios Médicos</span>
          </div>

          <nav className="menu-opciones">
            <a href="/bienvenida">Inicio</a>
            <Link to="/puestos">Puestos</Link>
          </nav>
        </aside>

        <div className="area-derecha">

          <header className="header-core">
            <div className="header-usuario">
              <div className="usuario-avatar">
                {nombreCompleto.charAt(0).toUpperCase()}
              </div>
              <div className="usuario-informacion">
                <span className="usuario-nombre">{nombreCompleto}</span>
                <span className="usuario-rol">{rol}</span>
              </div>
              <button type="button" className="boton-logout" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </header>

          <main className="contenido-principal">
            <h1>Puestos activos</h1>

            {cargando && <p>Cargando...</p>}
            {error && <p style={{ color: "var(--color-error-texto)" }}>{error}</p>}

            {!cargando && puestos.length === 0 && !error && (
              <p style={{ color: "var(--color-texto-secundario)" }}>
                No hay puestos activos en este momento.
              </p>
            )}

            <ul style={{ listStyle: "none", padding: 0 }}>
              {puestos.map((p) => (
                <li
                  key={p.codigo}
                  style={{
                    padding: 12,
                    border: "1px solid var(--color-borde)",
                    borderRadius: 8,
                    marginBottom: 8,
                    background: "var(--color-blanco)",
                  }}
                >
                  <Link
                    to="/puestos/oferentes"
                    state={{ codigoPuesto: p.codigo, nombrePuesto: p.nombre }}
                    style={{ color: "var(--color-primario)", fontWeight: 600, textDecoration: "none" }}
                  >
                    {p.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </main>

          <footer className="footer-core">CORE Servicios Médicos</footer>
        </div>
      </div>
    </div>
  );
}

export default ListadoPuestos;