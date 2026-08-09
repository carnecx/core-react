import api from './api';

// envia usuario y contrasena al gateway
export async function login(usuario, contrasena) {
    try {
        const respuesta = await api.post(
            '/api/auth/login',
            {
                usuario,
                contrasena
            }
        );

        return {
            status: respuesta.status,
            ...respuesta.data
        };
    }
    catch (error) {
        // si la api respondio con un error controlado
        if (error.response) {
            return {
                status: error.response.status,
                ...error.response.data
            };
        }

        // si no fue posible conectarse con la api
        throw error;
    }
}

// valida si el token almacenado sigue siendo valido
export async function validarToken(token) {
    try {
        const respuesta = await api.get(
            '/api/auth/validar',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return respuesta.data;
    }
    catch {
        return null;
    }
}