"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const commentModel_1 = __importDefault(require("../../model/comments/commentModel"));
const addComment = async (req, res) => {
    try {
        const { client, product, text, score } = req.body;
        if (!client || !product || !text || !score) {
            res.status(400).json({ message: 'Please provide all the required fields' });
            return;
        }
        const newComment = new commentModel_1.default({
            client,
            product,
            text,
            score
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error });
        return;
    }
};
exports.addComment = addComment;
