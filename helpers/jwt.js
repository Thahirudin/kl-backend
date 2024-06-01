const jwt = require('jsonwebtoken');
const SECRET_KEY = "Thahirudin";

function generateToken(payload) {
    const options = { expiresIn: '1m' }; // Token kedaluwarsa dalam 1 menit
    return jwt.sign(payload, SECRET_KEY, options);
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Token verification failed');
    }
}

module.exports = {
    generateToken,
    verifyToken
}
