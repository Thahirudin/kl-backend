const { Buku } = require('../models');

class BukuController {
    static async GetAllBooks(req, res) {
        try {
            const result = await Buku.findAll();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async GetOneBookById(req, res) {
        try {
            const id = req.params.id; // Ambil parameter id dari request
            const result = await Buku.findOne({ where: { id } }); // Gunakan objek dengan properti where untuk pencarian
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    static async createBook(req, res) {
        try {
            const { judul, kategori, ringkasan, penulis, imageUrl, readUrl } = req.body;
            if (!judul || !kategori || !ringkasan || !penulis || !imageUrl || !readUrl) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const data = { judul, kategori, ringkasan, penulis, imageUrl, readUrl };
            const result = await Buku.create(data);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateBook(req, res) {
        try {
            const id = +req.params.id;
            const { judul, kategori, ringkasan, penulis, imageUrl, readUrl } = req.body;
            if (!judul || !kategori || !ringkasan || !penulis || !imageUrl || !readUrl) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const data = { judul, kategori, ringkasan, penulis, imageUrl, readUrl };
            const [rowsUpdated, [updatedBook]] = await Buku.update(data, { where: { id }, returning: true });
            if (rowsUpdated > 0) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteBook(req, res) {
        try {
            const id = +req.params.id;
            const rowsDeleted = await Buku.destroy({ where: { id } });
            if (rowsDeleted > 0) {
                res.status(200).json({ message: 'Book deleted successfully' });
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = BukuController;
