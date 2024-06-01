const express = require("express");
const cors = require("cors"); // Import cors package

const app = express();
const router = require('./routers');
const PORT = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set header Access-Control-Allow-Origin: http://localhost:9000
app.use(cors());

app.use(router);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})