const bcrypt = require('bcryptjs');

function hashPassword(userPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

function comparePassword(userPassword, hash) {
    return bcrypt.compareSync(userPassword, hash);
}

module.exports = {
    hashPassword,
    comparePassword
}