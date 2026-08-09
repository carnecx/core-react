import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOferentesPorPuesto } from "../services/oferentesService";

// Core7: oferentes elegibles para el puesto seleccionado en Core6
function OferentesElegibles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [oferentes, setOferentes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const codigoPuesto = state?.codigoPuesto;
  const nombrePuesto = state?.nombrePuesto;

  useEffect(() => {
    if (!codigoPuesto) {
      navigate("/puestos");
      return;
    }

    const cargarOferentes = async () => {
      try {
        const data = await getOferentesPorPuesto(codigoPuesto);
        setOferentes(data);
      } catch {
        setError("No se pudo obtener el listado de oferentes.");
      } finally {
        setCargando(false);
      }
    };
    cargarOferentes();
  }, [codigoPuesto, navigate]);

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
              <span className="usuario-nombre">{nombrePuesto}</span>
            </div>
          </header>

          <main className="contenido-principal">
            <h1>Oferentes elegibles</h1>
            <p style={{ color: "var(--color-texto-secundario)" }}>
              Puesto: <strong>{nombrePuesto}</strong> ({codigoPuesto})
            </p>

            {cargando && <p>Cargando...</p>}
            {error && <p style={{ color: "var(--color-error-texto)" }}>{error}</p>}

            {!cargando && oferentes.length === 0 && !error && (
              <p style={{ color: "var(--color-texto-secundario)" }}>
                No hay oferentes elegibles para este puesto.
              </p>
            )}

            <ul style={{ listStyle: "none", padding: 0 }}>
              {oferentes.map((o) => (
                <li
                  key={o.identificacion}
                  style={{
                    padding: 12,
                    border: "1px solid var(--color-borde)",
                    borderRadius: 8,
                    marginBottom: 8,
                    background: "var(--color-blanco)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{o.nombreCompleto}</span> — {o.identificacion}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => navigate("/puestos")}
              style={{
                marginTop: 16,
                padding: "8px 16px",
                background: "var(--color-primario)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Regresar
            </button>
          </main>

          <footer className="footer-core">CORE Servicios Médicos</footer>
        </div>
      </div>
    </div>
  );
}

export default OferentesElegibles;