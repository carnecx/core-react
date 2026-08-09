import { useState } from 'react';
import { getOferenteDetalle } from '../services/oferentesService';

function OferenteDetalle() {
  const [identificacion, setIdentificacion] = useState('');
  const [oferente, setOferente] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const buscar = async (e) => {
    e.preventDefault();
    setError('');
    setOferente(null);
    setCargando(true);
    try {
      const data = await getOferenteDetalle(identificacion);
      setOferente(data);
    } catch {
      setError('Oferente no encontrado.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h2 style={{ color: 'var(--color-titulo)' }}>Detalle de oferente</h2>

      <form onSubmit={buscar} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Identificación"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
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

      {oferente && (
        <div style={{ border: '1px solid var(--color-borde)', borderRadius: 8, padding: 16, background: 'var(--color-blanco)' }}>
          <p><strong>Nombre:</strong> {oferente.nombreCompleto}</p>
          <p><strong>Identificación:</strong> {oferente.identificacion}</p>
          <p><strong>Tipo identificación:</strong> {oferente.tipoIdentificacion}</p>
          <p><strong>Fecha de nacimiento:</strong> {oferente.fechaNacimiento?.split('T')[0]}</p>
          <p><strong>Correos:</strong> {oferente.correos?.join(', ')}</p>
          <p><strong>Teléfonos:</strong> {oferente.telefonos?.join(', ')}</p>
          {oferente.rutaCurriculum && (
            <p><strong>Currículum:</strong> {oferente.rutaCurriculum}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OferenteDetalle;