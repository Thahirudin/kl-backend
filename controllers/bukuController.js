const { Buku } = require('../models');

class BukuController {
    static async GetAllBooks(req, res) {
        try {
            const bukus = await Buku.findAll();
            res.status(200).json({
                status: 'Berhasil',
                message: 'Berhasil Menampilkan Buku',
                Buku: bukus
            });
        } catch (error) {
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }

    static async GetOneBookById(req, res) {
        try {
            const id = req.params.id; // Ambil parameter id dari request
            const buku = await Buku.findOne({ where: { id } }); // Gunakan objek dengan properti where untuk pencarian
            if (buku) {
                res.status(200).json({
                    status: 'Berhasil',
                    message: 'Buku Berhasil Ditampilkan',
                    buku: buku
                }

                );
            } else {
                res.status(404).json({
                    status: 'Gagal',
                    message: 'Buku Tidak Ditemukan'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }


    static async createBook(req, res) {
        try {
            const { judul, kategori, ringkasan, penulis, imageUrl, readUrl } = req.body;
            const data = { judul, kategori, ringkasan, penulis, imageUrl, readUrl };
            const buku = await Buku.create(data);
            res.status(201).json({
                status: 'Berhasil',
                message: 'Buku Berhasil Ditambahkan',
                buku: buku
            });
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

    static async updateBook(req, res) {
        try {
            const id = +req.params.id;
            const { judul, kategori, ringkasan, penulis, imageUrl, readUrl } = req.body;
            const data = { judul, kategori, ringkasan, penulis, imageUrl, readUrl };
            const [rowsUpdated, [updatedBook]] = await Buku.update(data, { where: { id }, returning: true });
            if (rowsUpdated > 0) {
                res.status(200).json({
                    status: 'Berhasil',
                    message: 'Buku Berhasil Diupdate',
                    buku: updatedBook
                });
            } else {
                res.status(404).json({
                    status: 'Gagal',
                    message: 'Buku Tidak Dapat Ditemukan'
                });
            }
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

    static async deleteBook(req, res) {
        try {
            const id = +req.params.id;
            const rowsDeleted = await Buku.destroy({ where: { id } });
            if (rowsDeleted > 0) {
                res.status(200).json({
                    status: 'Berhasil',
                    message: 'Buku Berhasil Dihapus'
                });
            } else {
                res.status(404).json({
                    status: 'Gagal',
                    message: 'Buku Tidak dapat Ditemukan'
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'Gagal',
                message: 'Internal server error'
            });
        }
    }
}

module.exports = BukuController;
