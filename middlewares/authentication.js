const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const token = req.get('token');
        if (!token) {
            return res.status(401).json({
                status: 'Gagal',
                message: 'No token provided'
            });
        }
        const userDecoded = verifyToken(token);
        const user = await User.findOne({ where: { id: userDecoded.id } });
        if (!user) {
            return res.status(401).json({
                status: 'Gagal',
                name: 'Authentication Error',
                message: `User dengan id "${userDecoded.id}" tidak ditemukan`
            });
        }
        res.locals.user = user;
        next(); // Panggil next setelah menetapkan user di locals
    } catch (err) {
        res.status(401).json({
            status: 'Gagal',
            name: 'Authentication Error',
            message: 'Gagal mengautentikasi user'
        });
    }
}

module.exports = authentication;

