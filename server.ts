import express, { Express, Request, Response } from "express";
import path = require("path");
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript server is running...");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
