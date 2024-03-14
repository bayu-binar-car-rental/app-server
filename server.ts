import express, { Express, Request, Response } from "express";
import router from "./routes/api/router";
import path from "path";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const PORT = process.env.PORT || 3000;

class Server {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );
    this.app.use("/api/v1", router);
  }

  public run() {
    this.app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  }
}

new Server().run();
