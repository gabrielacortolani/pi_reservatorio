import express from "express";
import routes from './routes/index.js';
import db from './config/banco.js'
import cors from 'cors';

const app = express();

app.use(express.json());


routes(app);

db.sync(() => console.log(`Banco de dados conectado`));

export default app;