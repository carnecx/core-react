import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { crearPostulacion } from '../services/oferentesService';

function Postulacion() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const codigoPuestoUrl = searchParams.get('codigoPuesto') || '';
  const nombrePuestoUrl = searchParams.get('nombrePuesto') || '';

  const [form, setForm] = useState({
    identificacion: '',
    tipoIdentificacion: 'Cédula de identidad',
    nombreCompleto: '',
    fechaNacimiento: '',
    correos: '',
    telefonos: '',
    codigoPuesto: codigoPuestoUrl,
  });
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, codigoPuesto: codigoPuestoUrl }));
  }, [codigoPuestoUrl]);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setEnviando(true);
    try {
      const resultado = await crearPostulacion(form, archivo);
      setMensaje(resultado.mensaje || 'Datos guardados de manera satisfactoria');
    } catch (err) {
      const msg = err.response?.data?.mensaje || 'Ocurrió un error al enviar la postulación.';
      setError(msg);
    } finally {
      setEnviando(false);
    }
  };

  const cancelar = () => {
    navigate('/oferentes/seleccionar-puesto');
  };

  const irASeleccionPuesto = () => {
    navigate('/oferentes/seleccionar-puesto');
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
      <h2 style={{ color: 'var(--color-titulo)' }}>Formulario de participación</h2>

      {codigoPuestoUrl && (
        <div
          style={{
            padding: 10,
            background: 'var(--color-fondo-suave)',
            borderRadius: 6,
            marginBottom: 16,
            color: 'var(--color-texto)',
          }}
        >
          Está participando por el puesto: <strong>{nombrePuestoUrl || codigoPuestoUrl}</strong>
        </div>
      )}

      {mensaje ? (
        // Modal / pantalla de éxito
        <div style={{ padding: 20, background: 'var(--color-exito-fondo)', borderRadius: 8, textAlign: 'center' }}>
          <p style={{ color: 'var(--color-exito-texto)', marginBottom: 16 }}>{mensaje}</p>
          <button
            onClick={irASeleccionPuesto}
            style={{ padding: '10px 20px', background: 'var(--color-primario)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Aceptar
          </button>
        </div>
      ) : (
        <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input name="identificacion" placeholder="Identificación" value={form.identificacion} onChange={cambiar} required style={campoEstilo} />

          <select name="tipoIdentificacion" value={form.tipoIdentificacion} onChange={cambiar} style={campoEstilo}>
            <option>Cédula de identidad</option>
            <option>DIMEX</option>
            <option>Pasaporte</option>
          </select>

          <input name="nombreCompleto" placeholder="Nombre completo" value={form.nombreCompleto} onChange={cambiar} required style={campoEstilo} />

          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={cambiar} required style={campoEstilo} />

          <input name="correos" placeholder="Correo(s), separados por coma" value={form.correos} onChange={cambiar} required style={campoEstilo} />

          <input name="telefonos" placeholder="Teléfono(s), separados por coma" value={form.telefonos} onChange={cambiar} required style={campoEstilo} />

          <input
            name="codigoPuesto"
            placeholder="Código de puesto"
            value={form.codigoPuesto}
            onChange={cambiar}
            required
            readOnly={!!codigoPuestoUrl}
            style={{ ...campoEstilo, background: codigoPuestoUrl ? '#f1f1f1' : '#fff' }}
          />

          <label>
            Currículum:
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setArchivo(e.target.files[0])} style={{ display: 'block', marginTop: 6 }} />
          </label>

          {error && (
            <p style={{ padding: 10, background: 'var(--color-error-fondo)', color: 'var(--color-error-texto)', borderRadius: 6 }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="submit"
              disabled={enviando}
              style={{ flex: 1, padding: '10px 16px', background: 'var(--color-primario)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              {enviando ? 'Enviando...' : 'Aceptar'}
            </button>
            <button
              type="button"
              onClick={cancelar}
              style={{ flex: 1, padding: '10px 16px', background: '#fff', color: 'var(--color-primario)', border: '1px solid var(--color-primario)', borderRadius: 6, cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const campoEstilo = {
  padding: 8,
  border: '1px solid var(--color-borde)',
  borderRadius: 6,
};

export default Postulacion;