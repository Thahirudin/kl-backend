const router = require('express').Router();
const BukuController = require('../controllers/bukuController');
const UserController = require('../controllers/userController');
const FavoritController = require('../controllers/favoritController');
const authentication = require('../middlewares/authentication');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.put('/users/edit/:id', UserController.updateUser);
router.get('/users/:id', UserController.GetOneUserById);
router.get('/users', UserController.GetAllUsers);
router.delete('/users/:id', UserController.deleteUser);
router.get('/buku', BukuController.GetAllBooks);
router.post('/favorit', FavoritController.createFavorit);
router.get('/favorit', FavoritController.GetFavorit);
router.get('/favorit/:userId', FavoritController.getFavoritByUserId);
router.delete('/favorit/:id', FavoritController.deleteFavorit);
router.use(authentication);
router.get('/buku/:id', BukuController.GetOneBookById);
router.put('/buku/:id', BukuController.updateBook);
router.post('/buku', BukuController.createBook);
router.delete('/buku/:id', BukuController.deleteBook);


module.exports = router;

