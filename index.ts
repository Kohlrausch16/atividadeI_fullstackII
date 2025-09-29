import express, { json } from "express";
import productRouter from "./src/Routes/ProductRoutes";
import userRouter from "./src/Routes/UserRoutes";
import cors from 'cors';

const server = express();

const corsOptions = {origin: 'http://localhost:3000'}

server.use(cors(corsOptions));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(productRouter, userRouter);
server.listen(4000);