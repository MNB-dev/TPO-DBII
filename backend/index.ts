import express, { Request, Response, NextFunction }  from 'express';
import router from './src/routes/routes';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//CORS
app.use(cors())

//PARSER
app.use(express.json());

//ROUTES
app.use('/api', router);

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('There was an error.');
});

/* function validateUser(req: Request, res: Response, next: NextFunction) {
    if (true) {
      res.json({ status: 401, message: "No está autorizado." });
    } else {
      console.log("Autorizado");
      next();
    }
  }
  app.use(validateUser);
   */

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


  