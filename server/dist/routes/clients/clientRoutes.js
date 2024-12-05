"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setClients_1 = require("../../controllers/clients/setClients");
const router = express_1.default.Router();
router.post("/add-client", setClients_1.addClient).post("/register", setClients_1.register).post("/login", setClients_1.login);
exports.default = router;
