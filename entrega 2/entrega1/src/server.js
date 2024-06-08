import express from "express";
import path from "path";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";



const PORT = 8080;
const HOST = "localhost";
const server = express();

server.use("/public", express.static(path.join(path.basename("src"), "public")));

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);

server.use("*", (req, res) => {
    return res.status(404).send("<h1>Error 404</h1>");
});

server.listen(PORT, ()=>{
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});