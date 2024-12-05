"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setPurchase_1 = require("../../controllers/purchase/setPurchase");
const router = express_1.default.Router();
// Get all comments
router.post("/add-to-cart", setPurchase_1.addToCart);
exports.default = router;
