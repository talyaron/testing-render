"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const productModel_1 = __importDefault(require("../../model/products/productModel"));
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, inStock } = req.body;
        const newProduct = new productModel_1.default({
            name,
            price,
            description,
            category,
            inStock,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product saved', savedProduct });
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving product', error });
    }
};
exports.addProduct = addProduct;
