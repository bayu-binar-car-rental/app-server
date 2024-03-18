import express, { Express, Request, Response } from "express";
import router from "./routes/api/router";
import path from "path";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://bayu-binar-car-rental.netlify.app",
];

class Server {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: function (origin, callback) {
          // allow requests with no origin
          // (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            var msg =
              "The CORS policy for this site does not " +
              "allow access from the specified Origin.";
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
      })
    );
    this.app.use("/api/v1", router);
  }

  public run() {
    this.app.listen(PORT, () => {
      console.log(process.env.DATABASE_URL);
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

new Server().run();
