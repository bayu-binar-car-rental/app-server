import ServiceCars from "../services/ServiceCars";
import Cars, { ICars } from "../models/Cars";
import { Request, Response } from "express";
import media from "../utils/upload";

export default class ControllerCars {
  private _serviceCars: ServiceCars;

  constructor(serviceCars: ServiceCars) {
    this._serviceCars = serviceCars;
  }

  root() {
    return (req: Request, res: Response) => {
      res.json({ message: "Hi there! This is a CDed version" });
    };
  }

  list() {
    return async (req: Request, res: Response) => {
      console.log("Accessing database...");
      try {
        const query = req.query;
        let result = (await this._serviceCars.list(query)) as Cars[] | string;

        console.log(result.length);

        if (result.length < 1) {
          res.status(401).json({
            meta: {
              success: false,
              code: 401,
              message: "failed",
            },
            data: "Sorry, we cannot find your car.. :(",
          });
        }

        res.status(200).json({
          meta: {
            success: true,
            code: 200,
            message: "success",
          },
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const id = +req.params?.id;
        let result = (await this._serviceCars.find(id)) as Cars | string;

        if (!result) {
          res.status(404).json({
            meta: {
              success: false,
              code: 404,
              message: "failed",
            },
            data: "Sorry, we cannot find your car.. :(",
          });
        }

        res.status(200).json({
          meta: {
            success: true,
            code: 200,
            message: "success",
          },
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const id = +req.params?.id;
        const params = req.body;
        const result = await this._serviceCars.update(id, params);

        if (!result) {
          res.status(404).json({
            meta: {
              success: false,
              code: 404,
              message: "failed",
            },
            data: "Sorry, we cannot find your car.. :(",
          });
        }

        res.status(200).json({
          meta: {
            success: true,
            code: 200,
            message: "success",
          },
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  remove() {
    return async (req: Request, res: Response) => {
      try {
        const id = +req.params?.id;
        const result = await this._serviceCars.remove(id);

        if (!result) {
          res.status(404).json({
            meta: {
              success: false,
              code: 404,
              message: "failed",
            },
            data: "Sorry, we cannot find your car.. :(",
          });
        }

        res.status(200).json({
          meta: {
            success: true,
            code: 200,
            message: "success",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const params = req.body;
        const result = await this._serviceCars.create(params);

        if (!result) {
          res.status(404).json({
            meta: {
              success: false,
              code: 404,
              message: "failed",
            },
            data: "Failed to create car",
          });
        }

        res.status(200).json({
          meta: {
            success: true,
            code: 200,
            message: "success",
          },
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  upload() {
    return async (req: Request, res: Response) => {
      console.log("Running upload function");
      try {
        if (req.file) {
          console.log(req.file);
          const fileBase64 = req.file.buffer.toString("base64");
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          const resultUpload = await media.storage.uploader.upload(
            file,
            (err, result) => {
              if (err) {
                return res.status(403).json({
                  meta: {
                    code: 403,
                    success: false,
                    message: "failed",
                  },
                  data: "Failed upload to storage",
                });
              }

              return result;
            }
          );

          return res.status(200).json({
            meta: {
              code: 200,
              success: true,
              message: "success",
            },
            data: resultUpload,
          });
        }

        res.status(404).json({
          meta: {
            code: 404,
            success: false,
            message: "failed",
          },
          data: "file not found",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          meta: {
            code: 500,
            success: false,
            message: "failed",
          },
          data: "Upload failed",
        });
      }
    };
  }
}
