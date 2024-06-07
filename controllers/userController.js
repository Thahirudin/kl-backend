const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { Op, where } = require('sequelize');
const path = require('path')
const fs = require('fs');

class UserController {
    static async register(req, res) {
        const { nama, profil, tanggalLahir, jk, role, username, email, password } = req.body;
        try {
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ username }]
                }
            });

            if (existingUser) {
                return res.status(409).json({
                    status: 'Gagal',
                    message: 'Username Sudah Pernah Digunakan'
                });
            }

            const hashedPassword = await hashPassword(password);
            const user = await User.create({
                nama,
                profil,
                tanggalLahir,
                jk,
                role,
                username,
                email,
                password: hashedPassword
            });

            const response = {
                status: 'Berhasil',
                message: 'User berhasil ditambahkan',
                user: {
                    id: user.id,
                    nama: user.nama,
                    profil: user.profil,
                    tanggalLahir: user.tanggalLahir,
                    jk: user.jk,
                    role: user.role,
                    username: user.username,
                    email: user.email
                }
            };
            res.status(201).json(response);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                const messages = err.errors.map(e => e.message);
                return res.status(400).json({
                    status: 'Gagal', messages
                });
            }
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal Server Error',
            });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).json({
                    status: 'Gagal',
                    message: 'User Tidak Ditemukan'
                });
            }
            const isCorrect = await comparePassword(password, user.password);
            if (!isCorrect) {
                return res.status(401).json({
                    status: 'Gagal',
                    message: 'Password Salah'
                });
            }
            const token = generateToken({
                id: user.id,
                role: user.role
            });
            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }

    static async GetAllUsers(req, res) {
        try {
            const totalUser = await User.count();
            const users = await User.findAll({
                order: [['id', 'ASC']]
            });
            res.status(200).json({
                status: 'Berhasil',
                message: 'Berhasil Menampilkan Data User',
                totalUser: totalUser,
                users
            });
        } catch (err) {
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }

    static async GetOneUserById(req, res) {
        const id = +req.params.id;
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                res.status(200).json({
                    status: 'Berhasil',
                    message: 'Berhasil Menampilkan data User',
                    user
                });
            } else {
                res.status(404).json({
                    status: 'Gagal',
                    message: 'User not found'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ 
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { nama, tanggalLahir, jk, role, username, email, password } = req.body;

            // Cari user terlebih dahulu
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({
                    status: 'Gagal',
                    message: 'User tidak ditemukan'
                });
            }
            // Validasi username
            if (username) {
                const existingUser = await User.findOne({
                    where: {
                        username,
                        id: { [Op.ne]: userId } // Cek username milik user lain
                    }
                });
                if (existingUser) {
                    return res.status(409).json({
                        status :' Gagal',
                        message: 'Username sudah digunakan oleh user lain'
                    });
                }
            }
            let profil = user.profil;
            if (req.file) {
                profil = "/" + req.file.path.split(path.sep).join('/');
                if (user.profil) {
                    fs.unlink(path.join(__dirname, '..', user.profil), (err) => {
                        if (err) console.error('Error saat menghapus file gambar sebelumnya:', err);
                    });
                }
            }
            // Jika password di-update, hash password baru
            let hashedPassword = user.password;
            if (password) {
                hashedPassword = await hashPassword(password);
            }

            // Update user
            const updatedUser = await user.update({ nama, profil, tanggalLahir, jk, role, username, email, password: hashedPassword });
            const response = {
                status: 'Berhasil',
                message: 'User Berhasil DiUpdate',
                user: updatedUser
            }
            // Kirimkan respons sukses
            res.status(200).json(response);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                const messages = err.errors.map(e => e.message);
                return res.status(400).json({
                    status: 'Gagal',
                    messages,
                });
            }
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }


    static async deleteUser(req, res) {
        const id = +req.params.id;
        try {
            const rowsDeleted = await User.destroy({ where: { id } });
            if (rowsDeleted > 0) {
                res.status(200).json({
                    status: 'Berhasil',
                    message: 'User Berhasil Dihapus'
                });
            } else {
                res.status(404).json({
                    status: 'Gagal',
                    message: 'User Tidak Ditemukan'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }
}

module.exports = UserController;
