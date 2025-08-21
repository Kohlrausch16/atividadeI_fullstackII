import express from "express";
import { Request, Response } from "express";

const server = express();

server.use(express.urlencoded({extended: true}));

server.get('/', (req: Request, res: Response) => {
    res.json({test: "Correct"}).status(200);
});

server.listen(3000);