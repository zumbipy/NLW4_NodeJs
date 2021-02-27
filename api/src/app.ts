import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express';
import createConnection from "./database"
import { router } from './router';
import { AppErros } from './errors/AppErros';

createConnection();
const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response:Response, _next: NextFunction ) =>{
    if(err instanceof AppErros){
        return response.status(err.statusCode). json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    })
})

export { app };