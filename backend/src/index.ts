import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerconfig';
import connectDB from './config/db';
import router from './routes/index';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Welcome To The Dynamites backend e-commerce' });
});
  
  app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async function(){
    try{
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }catch(err){
        console.log(err);
    }
}
startServer();