import ServiceCars from "../services/ServiceCars";
import { Request, Response } from "express";
import Cars, { ICars } from "../models/Cars";

export default class ControllerCars {
  private _serviceCars: ServiceCars;

  constructor(serviceCars: ServiceCars) {
    this._serviceCars = serviceCars;
  }

  list() {
    return async (req: Request, res: Response) => {
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

  delete() {
    return async (req: Request, res: Response) => {
      try {
        const id = +req.params?.id;
        const result = await this._serviceCars.delete(id);

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
}
