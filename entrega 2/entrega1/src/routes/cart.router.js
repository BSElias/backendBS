import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const ROUTER = Router();
const CART = new CartManager();

// C.Manager
ROUTER.post("/", async (req, res) => {
    res.status(201).send(await CART.addCart());
});

ROUTER.get("/", async (req, res) => {
    res.status(200).send(await CART.getCarts());
});

ROUTER.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    res.status(200).send(await CART.getCartById(id));
});

ROUTER.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    return res.status(200).send(await CART.deleteCartById(id));
});

ROUTER.post("/:cid/products/:pid", async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    res.status(200).send(await CART.addProductToCart(cartId, productId));
});

export default ROUTER;