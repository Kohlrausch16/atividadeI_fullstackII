import express, { json } from "express";
import router from "./src/Routes";

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(router);
server.listen(3000);