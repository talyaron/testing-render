"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors")); //npm install cors
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)()); //open to the whole world. Highly dangerous!!!
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use((0, cookie_parser_1.default)());
//DB
const dbUrl = process.env.DB_URL;
const database = 'fs-jun24';
//connection
mongoose_1.default.connect(`${dbUrl}/${database}`).then(() => {
    console.info("DB connected");
}).catch((err) => {
    console.error(err);
});
app.get('/api/example', (_req, res) => {
    res.json({ message: 'Hello from server' });
});
//routes
const clientRoutes_1 = __importDefault(require("./routes/clients/clientRoutes"));
app.use("/api/clients", clientRoutes_1.default);
const productRoute_1 = __importDefault(require("./routes/products/productRoute"));
app.use("/api/products", productRoute_1.default);
const commentsRoute_1 = __importDefault(require("./routes/comments/commentsRoute"));
app.use("/api/comments", commentsRoute_1.default);
const purchaseRouter_1 = __importDefault(require("./routes/purchase/purchaseRouter"));
app.use("/api/purchase", purchaseRouter_1.default);
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
