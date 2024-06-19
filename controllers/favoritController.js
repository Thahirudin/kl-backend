const { Buku, User, Favorit } = require('../models');
class FavoritController {
    static async createFavorit(req, res) {
        try {
            const { userId, bukuId } = req.body;

            // Validasi input
            if (!userId || !bukuId) {
                return res.status(400).json({
                    status: 'Gagal',
                    message: 'userId dan bukuId harus diisi'
                });
            }

            // Cek apakah user dan buku ada
            const user = await User.findByPk(userId);
            const buku = await Buku.findByPk(bukuId);

            if (!user || !buku) {
                return res.status(404).json({
                    status: 'Gagal',
                    message: 'User atau Buku tidak ditemukan'
                });
            }

            // Cek apakah favorit sudah ada
            const existingFavorit = await Favorit.findOne({ where: { userId, bukuId } });

            if (existingFavorit) {
                return res.status(409).json({
                    status: 'Gagal',
                    message: 'Favorit sudah ada'
                });
            }

            // Buat data favorit baru
            const favorit = await Favorit.create({ userId, bukuId });

            res.status(201).json(
                {
                    status: 'Berhasil',
                    message: 'Favorit Berhasil Ditambahkan',
                    favorit
                });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'Gagal',
                message: err,
            });
        }
    }

    static GetFavorit(req, res) {
        Favorit.findAll({
            include: [
                { model: User }, // Include the User model
                { model: Buku }  // Include the Buku model
            ]
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static async getFavoritByUserId(req, res) {
        try {
            const { userId } = req.params;

            // Cek apakah user ada
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    status: 'Gagal',
                    message: 'User tidak ditemukan'
                });
            }

            const favorit = await Favorit.findAll({
                where: { userId },
                attributes: ['id', 'userId', 'bukuId', 'createdAt', 'updatedAt'],
                include: [
                    { model: User }, // Sertakan model User
                    { model: Buku }  // Sertakan model Buku
                ]
            });

            res.status(200).json({
                status: 'Berhasil',
                message: 'Favorit Berhasil Ditampilkan',
                favorit
            });
        } catch (err) {
            res.status(500).json({
                status: 'Gagal',
                message: err
            });
        }
    }
    static deleteFavorit(req, res) {
        let id = +req.params.id;
        Favorit.destroy({ where: { id } })
            .then(result => {
                res.status(200).json({
                    status: 'Berhasil',
                    message: 'Favorit Berhasil Dihapus',
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 'Gagal',
                    message: err
                })
            })
    }
}
module.exports = FavoritController;