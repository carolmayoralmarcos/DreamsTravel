require("dotenv").config();
const express = require('express');
const { connectDB } = require("./src/utils/db")
const cors = require('cors');
const server = express();
connectDB();

server.use(cors());
const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
server.use(express.json());
const routerTravel = require('./src/api/routes/travel.routes');
const routerUser = require("./src/api/routes/user.routes")
server.use('/user', routerUser);
server.use('/travel', routerTravel);

const PORT = process.env.PORT;


server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
