const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUserData(user, password) {
    // Validación: Usuario y contraseña deben ser proporcionados
    if (!user || !password) {
        throw new Error('Usuario y/o contraseña no proporcionados');
    }

    const rows = await db.query(`
        SELECT * FROM usuarios
        WHERE login = ? AND password = ?
    `, [user, password]);

    const userData = helper.emptyOrRows(rows);

    // Validación: Verificar si se encontraron datos para el usuario
    if (!userData.length) {
        throw new Error('Usuario y/o contraseña incorrectos');
    }

    return {
        userData
    };
}

module.exports = {
    getUserData
};
