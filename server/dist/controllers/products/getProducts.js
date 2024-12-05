"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProducts = getMyProducts;
exports.getProducts = getProducts;
const productModel_1 = __importDefault(require("../../model/products/productModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const setClients_1 = require("../clients/setClients");
const purchaseModel_1 = require("../../model/purchase/purchaseModel");
async function getMyProducts(req, res) {
    try {
        const { user } = req.cookies;
        console.log(user);
        //decode the token
        const decoded = jwt_simple_1.default.decode(user, setClients_1.secret);
        console.log(decoded);
        const _products = await purchaseModel_1.PurchaseModel.find({ clientId: decoded.id }).populate('productId');
        const products = _products.map((product) => product.productId);
        res.json({ message: "Get all products", useId: user, products });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error ${error.message} ` });
    }
}
async function getProducts(req, res) {
    try {
        const products = await productModel_1.default.find();
        res.status(200).send({ products });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error ${error.message} ` });
    }
}
