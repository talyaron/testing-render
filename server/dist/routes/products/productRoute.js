"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setProducts_1 = require("../../controllers/products/setProducts");
const getProducts_1 = require("../../controllers/products/getProducts");
const router = express_1.default.Router();
// Get all comments
// Create a new comment
router.post('/add-product', setProducts_1.addProduct);
router.get('/my-products', getProducts_1.getMyProducts).get('/get-all-products', getProducts_1.getProducts);
exports.default = router;
