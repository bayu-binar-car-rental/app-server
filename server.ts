import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded());

// List
app.get("/", (_, res: Response) => {
  res.send("GET: List");
});

// Find
app.get("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  res.send(`GET: Find ID ${id}`);
});

// Create
app.post("/", (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.send(`POST: Create => ${JSON.stringify(body)}`);
});

// Update
app.patch("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  res.send(`PATCH: Update ID ${id}`);
});

// Delete
app.delete("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  res.send(`DELETE: Delete ID ${id}`);
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
