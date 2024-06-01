const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { Op } = require('sequelize');

class UserController {
    static async register(req, res) {
        const { nama, email, password, username, role, jk, profile } = req.body;
        try {
            // Validasi input
            if (!nama || !email || !password || !username || !role || !jk) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Cek apakah email atau username sudah digunakan
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ email }, { username }]
                }
            });

            if (existingUser) {
                return res.status(409).json({ message: 'Email or username is already in use' });
            }

            const hashedPassword = await hashPassword(password);
            const user = await User.create({
                nama,
                email,
                username,
                role,
                jk,
                profile,
                password: hashedPassword
            });

            const response = {
                id: user.id,
                nama: user.nama,
                email: user.email,
                username: user.username,
                role: user.role,
                jk: user.jk,
                profile: user.profile
            };

            res.status(201).json(response);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User Tidak Ditemukan' });
            }
            const isCorrect = await comparePassword(password, user.password);
            if (!isCorrect) {
                return res.status(401).json({ error: 'Password Salah' });
            }
            const token = generateToken({ id: user.id });
            res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    static async GetAllUsers(req, res) {
        try {
            const result = await User.findAll();
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async GetOneUserById(req, res) {
        const id = +req.params.id;
        try {
            const result = await User.findByPk(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { nama, email, password } = req.body;

            // Lakukan validasi data input jika diperlukan

            // Lakukan pembaruan pengguna di dalam database
            const updatedUser = await User.findByIdAndUpdate(userId, { nama, email, password }, { new: true });

            // Kirim respon dengan pengguna yang telah diperbarui
            res.status(200).json(updatedUser);
        } catch (error) {
            // Tangani kesalahan jika terjadi
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteUser(req, res) {
        const id = +req.params.id;
        try {
            const rowsDeleted = await User.destroy({ where: { id } });
            if (rowsDeleted > 0) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UserController;
