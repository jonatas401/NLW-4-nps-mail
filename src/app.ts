import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors'
import { router } from './routes';
import createConnection from './database';
import { AppError } from '../errors/AppError';

 
//import '../../api/ormconfig.json'
const app = express()
createConnection();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    
    }
    return res.status(500).json({
        status: 'error',
        message: `error no servidor ${err.message}`
    })
})

export { app }