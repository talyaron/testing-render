"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = addToCart;
const purchaseModel_1 = require("../../model/purchase/purchaseModel");
async function addToCart(req, res) {
    try {
        const { user } = req.cookies;
        const { productId } = req.body;
        if (!productId || !user)
            throw new Error("Missing required information");
        await purchaseModel_1.PurchaseModel.create({ productId, clientId: user });
        res.status(200).json({ message: "Product added to cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal server error ${error.message} ` });
    }
}
