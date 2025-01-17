import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerconfig';
import connectDB from './config/db';
import router from './routes/index';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(express.json());

// Route for the index page
app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Welcome To The Dynamites backend e-commerce' });
});
  
  // Middleware to handle all endpoint routes
  app.use('/api', router);

// Route for serving Swagger documentation
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