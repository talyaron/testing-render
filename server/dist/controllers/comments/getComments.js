"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentByProductId = getCommentByProductId;
const commentModel_1 = __importDefault(require("../../model/comments/commentModel"));
async function getCommentByProductId(req, res) {
    try {
        const { productId } = req.query;
        if (!productId) {
            return res.status(400).json({ message: 'productId is required' });
        }
        const comments = await commentModel_1.default.find({ product: productId }).populate('client').populate('product').exec();
        res.status(200).json({ comments });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
