import { useState } from 'react';
import { getOferentesPorPuesto } from '../services/oferentesService';

function OferentesPorPuesto() {
  const [codigoPuesto, setCodigoPuesto] = useState('');
  const [oferentes, setOferentes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const buscar = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const data = await getOferentesPorPuesto(codigoPuesto);
      setOferentes(data);
    } catch {
      setError('No se pudo obtener el listado de oferentes.');
      setOferentes([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2 style={{ color: 'var(--color-titulo)' }}>Oferentes por puesto</h2>

      <form onSubmit={buscar} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Código de puesto (ej. MED-001)"
          value={codigoPuesto}
          onChange={(e) => setCodigoPuesto(e.target.value)}
          required
          style={{ flex: 1, padding: 8, border: '1px solid var(--color-borde)', borderRadius: 6 }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', background: 'var(--color-primario)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Buscar
        </button>
      </form>

      {cargando && <p>Cargando...</p>}
      {error && <p style={{ color: 'var(--color-error-texto)' }}>{error}</p>}

      {!cargando && oferentes.length === 0 && !error && (
        <p style={{ color: 'var(--color-texto-secundario)' }}>No hay resultados todavía.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {oferentes.map((o) => (
          <li
            key={o.identificacion}
            style={{
              padding: 12,
              border: '1px solid var(--color-borde)',
              borderRadius: 8,
              marginBottom: 8,
              background: 'var(--color-blanco)',
            }}
          >
            <strong>{o.nombreCompleto}</strong> — {o.identificacion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OferentesPorPuesto;