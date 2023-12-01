//Credenciales de la base de datos
const config = {
    db: {
        host: '127.0.0.1', // Asigna aquí el nombre del host de tu base de datos
        user: 'root', // Asigna aquí el nombre de usuario de la base de datos
        password: 'Pepesito1234', // Asigna aquí la contraseña de la base de datos
        database: 'bdgestion', // Asigna aquí el nombre de la base de datos
        connectTimeout: 10000 // Asigna aquí el tiempo de espera de conexión (en milisegundos), por ejemplo
    },
}

module.exports = config;