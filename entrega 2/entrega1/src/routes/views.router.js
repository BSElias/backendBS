import { Router } from "express";

const ROUTER = Router();

ROUTER.get("/", async (req, res) => {
    try {
        const allProducts = await PRODUCT.getProducts();
        return res.status(200).render("products", {
            title: "Products",
            products: allProducts,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

ROUTER.get("/realtimeproducts", async (req, res) => {
    try {
        return res.status(200).render("realTimeProducts", { title: "realTimeProducts" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Hubo un error en el servidor" });
    }
});

ROUTER.get("/", async (req, res) => {
    try {
        return res.status(200).render("home", { title: "Home" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Hubo un error en el servidor" });
    }
});

export default ROUTER;