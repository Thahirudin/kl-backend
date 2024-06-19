const express = require("express");
const path = require('path');
const cors = require("cors"); // Import cors package
const multer = require('multer');

const app = express();
const router = require('./routers');
const PORT = 3000

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.use(router);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})