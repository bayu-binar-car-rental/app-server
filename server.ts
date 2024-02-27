import express, { Express, Request, Response } from "express";
import router from "./routes/api/router";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const PORT = process.env.PORT || 8000;

class Server {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use("/api/v1", router);
  }

  public run() {
    this.app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  }
}

new Server().run();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(express.json());

// // List
// app.get("/", async (_, res: Response) => {
//   const cars = await CarsModel.query();
//   return res.json(cars);
// });

// // Find
// app.get("/:id", async (req: Request, res: Response) => {
//   const id = +req.params.id;
//   const car = await CarsModel.query().findById(id);
//   if (!car) {
//     return res.status(400).json({
//       meta: {
//         status: 400,
//         sucess: false,
//         message: `Car with the id of ${id} not found`,
//       },
//     });
//   }

//   return res.status(200).json({
//     meta: {
//       status: 200,
//       success: true,
//       message: "success",
//     },
//     data: car,
//   });
// });

// // Create
// app.post("/", async (req: Request, res: Response) => {
//   const body = req.body;
//   const car = await CarsModel.query().insert(body);
//   return res.json(car);
// });

// // Upload file via multer
// app.post(
//   "/profile",
//   upload.single("picture"),
//   (req: Request, res: Response) => {
//     const url = `./public/images/${req.file?.filename}`;
//     res
//       .status(200)
//       .json({ message: "Image uploaded. Please see the link", url });
//   }
// );

// // Update
// app.patch("/:id", async (req: Request, res: Response) => {
//   const body = req.body;
//   const id = +req.params.id;

//   const car = await CarsModel.query().findById(id).patch(body);
//   return res.json(car);
// });

// // Delete
// app.delete("/:id", async (req: Request, res: Response) => {
//   const id = +req.params.id;
//   const car = await CarsModel.query().deleteById(id);

//   return res.json({
//     message: `Car with ID:${id} has been successfuly deleted`,
//   });
// });
