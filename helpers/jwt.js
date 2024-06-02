const jwt = require('jsonwebtoken');
const SECRET_KEY = "KidsLibrary2";

function generateToken(payload) {
    const options = { expiresIn: '30m' };
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
