import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import ApiRouter from './routes/api.routes';
import cors from 'cors';    

dotenv.config();
const app = express();

//Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../public'));

//Routes
app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World');
});
app.use('/api/v1', ApiRouter);

export default app;