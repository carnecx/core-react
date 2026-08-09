import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPuestosActivos } from '../services/puestosService';

function SeleccionarPuesto() {
  const [puestos, setPuestos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPuestos = async () => {
      try {
        const data = await getPuestosActivos();
        setPuestos(data);
      } catch {
        setError('No se pudieron cargar los puestos disponibles.');
      } finally {
        setCargando(false);
      }
    };
    cargarPuestos();
  }, []);

  const participar = (codigoPuesto, nombrePuesto) => {
    navigate(`/oferentes/postulacion?codigoPuesto=${encodeURIComponent(codigoPuesto)}&nombrePuesto=${encodeURIComponent(nombrePuesto)}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2 style={{ color: 'var(--color-titulo)' }}>Puestos disponibles</h2>
      <p style={{ color: 'var(--color-texto-secundario)' }}>
        Seleccione un puesto para completar el formulario de participación.
      </p>

      {cargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'var(--color-error-texto)' }}>{error}</p>}

      {!cargando && puestos.length === 0 && !error && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>No hay puestos disponibles en este momento.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {puestos.map((p) => (
          <li
            key={p.codigo}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              border: '1px solid var(--color-borde)',
              borderRadius: 8,
              marginBottom: 8,
              background: 'var(--color-blanco)',
            }}
          >
            <span><strong>{p.nombre}</strong> — {p.codigo}</span>
            <button
              onClick={() => participar(p.codigo, p.nombre)}
              style={{ padding: '6px 14px', background: 'var(--color-primario)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              Participar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeleccionarPuesto;