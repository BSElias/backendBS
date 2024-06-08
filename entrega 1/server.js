import express from "express";


const PORT = 8080;
const HOST = "localhost";
const server = express();

server.get("/bienvenida", (req, res)=>{
    res.send("<h1 style='color:blue;'> cdtm4</h1>")
});



server.listen(PORT, ()=>{
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});