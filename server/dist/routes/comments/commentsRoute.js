"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setComments_1 = require("../../controllers/comments/setComments");
const getComments_1 = require("../../controllers/comments/getComments");
const router = express_1.default.Router();
// Get all comments
// Create a new comment
router.post('/add-comment', setComments_1.addComment);
router.get('/get-comment-by-product-id', getComments_1.getCommentByProductId);
exports.default = router;
