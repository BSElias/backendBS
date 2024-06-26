import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ROUTER = Router();
const PRODUCT = new ProductManager();

ROUTER.get("/", async (req, res) => {
    try {
        const allProducts = await PRODUCT.getProducts();
        return res.status(200).render("index", {
            title: "Products",
            products: allProducts,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

ROUTER.get("/realtimeproducts", async (req, res) => {
    return res.status(200).render("realTimeProducts", { title: "realTimeProducts" });
});

export default ROUTER;