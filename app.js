import express, { urlencoded } from 'express'
 import routes from './routes/index.js';
import cors from 'cors'
const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', routes)


export default app

