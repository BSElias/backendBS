import express from "express";
import handlebars from "./config/handlebars.config.js";
import productRouter from "./routes/api.product.router.js";
import cartRouter from "./routes/api.cart.router.js";
import path from "./utils/paths.js";
import viewsProductRouter from "./routes/app.product.router.js";
import viewsCartRouter from "./routes/app.cart.router.js";
import viewsRouter from "./routes/views.router.js";
import serverSocket from "./config/socket.config.js";
import mongoDB from "./config/mongoose.config.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

//Decodificador body

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Config plantillas
handlebars.config(server);

//Enrutadores
server.use("/", viewsRouter);
server.use("/carts", viewsCartRouter);
server.use("/products", viewsProductRouter);
server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);

//Rutas
server.use("/", express.static(path.css));
server.use("/", express.static(path.js));
server.use("/", express.static(path.images));
server.use("/products", express.static(path.css));
server.use("/products", express.static(path.images));
server.use("/carts", express.static(path.css));
server.use("/realTimeProducts", express.static(path.js));
server.use("/realTimeProducts", express.static(path.css));
server.use("/realTimeProducts", express.static(path.images));

//Rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404 - No existe la URL indicada </h1>");
});

//Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500 - Error en el Servidor</h1>");
});

//Oyente de solicitudes
const serverHTTP = server.listen(PORT, ()=>{
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
    mongoDB.connectDB();
});

//Config servidor de websocket
serverSocket.CONFIG(serverHTTP);