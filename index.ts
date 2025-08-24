import express, { json } from "express";
import productRouter from "./src/Routes/ProductRoutes";
import userRouter from "./src/Routes/UserRoutes";

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(productRouter, userRouter);
server.listen(3000);