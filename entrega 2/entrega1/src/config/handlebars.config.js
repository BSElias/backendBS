import handlebars from "express-handlebars";
import path from "../utils/path.js";

const config = (SERVER) => {
    SERVER.engine("handlebars", handlebars.engine());
    SERVER.set("views", path.views);
    SERVER.set("view engine", "handlebars");
};

export default { config };