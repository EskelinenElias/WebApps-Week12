import express, { Express, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import cors, { CorsOptions } from 'cors'; 
import router from "./routes";
import connectToDB from "./config/db";

// Initialize app
const app: Express = express();

// Add middleware
app.use(express.json());
app.use(morgan("dev"));

// Add routing
app.use("/", router);

// Confifure Cross-Origin Resource Sharing (CORS)
if (process.env.NODE_ENV === 'development') {
  const corsOptions: CorsOptions = {
    origin: 'http://localhost: 3000',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions)); 
}

// Configure server settings
const host: string = "127.0.0.1";
const port: number = 1234;

// Serve static files
// app.use(express.static(path.join(__dirname, "../public")));

// Configure database settings
const dbAddress = "mongodb://127.0.0.1:27017/testdb";

// Connect to database
connectToDB(dbAddress).then(() => {
  console.log(`Connected to database at ${dbAddress}`);

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
});