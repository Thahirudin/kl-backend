const router = require('express').Router();
const BukuController = require('../controllers/bukuController');
const UserController = require('../controllers/userController');
const FavoritController = require('../controllers/favoritController');
const authentication = require('../middlewares/authentication');
const multer = require('multer');

// Konfigurasi multer untuk file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.get('/buku', BukuController.GetAllBooks);

router.use(authentication);
router.put('/buku/:id', isAdmin, BukuController.updateBook);
router.post('/buku', isAdmin, BukuController.createBook);
router.delete('/buku/:id', isAdmin, BukuController.deleteBook);
router.get('/users',isAdmin, UserController.GetAllUsers);
router.get('/buku/:id', BukuController.GetOneBookById);

router.post('/favorit', FavoritController.createFavorit);
router.get('/favorit', FavoritController.GetFavorit);
router.get('/favorit/:userId', FavoritController.getFavoritByUserId);
router.delete('/favorit/:id', FavoritController.deleteFavorit);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users/:id', UserController.GetOneUserById);
router.put('/users/edit/:id', UserController.updateUser);





function isAdmin(req, res, next) {
    if (res.locals.user.role !== 'Admin') {
        return res.status(403).json({
            status: 'Gagal',
            message: 'Forbidden'
        });
    }
    next();
}
module.exports = router;

