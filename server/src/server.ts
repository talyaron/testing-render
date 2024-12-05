import express, { Request, Response } from 'express'
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'; 
import 'dotenv/config';
import cors from 'cors'; //npm install cors
import path from 'path';

const app = express()
const port = process.env.PORT || 5000;
app.use(cors()); //open to the whole world. Highly dangerous!!!

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//DB
const dbUrl = process.env.DB_URL;
const database = 'fs-jun24';

//connection
mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});

app.get('/api/example', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from server' });
});

//routes
import clientsRouter from './routes/clients/clientRoutes';
app.use("/api/clients", clientsRouter);
import productsRouter from './routes/products/productRoute';
app.use("/api/products", productsRouter);
import commentsRouter from './routes/comments/commentsRoute';
app.use("/api/comments", commentsRouter);
import Purchase from "./routes/purchase/purchaseRouter";
app.use("/api/purchase", Purchase);

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})