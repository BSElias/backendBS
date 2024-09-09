import handlebars from "express-handlebars";
import PATH from "../utils/paths.js";

const config = (SERVER) => {
    SERVER.engine("handlebars", handlebars.engine());
    SERVER.set("views", PATH.views);
    SERVER.set("view engine", "handlebars");
};

export default { config };