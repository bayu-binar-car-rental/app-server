import { Request, Response } from "express";

import { ITransactions } from "../models/Transactions";
import ServiceTransactions from "../services/ServiceTransactions";
import ResponseBuilder from "../utils/ResponseBuilder";
import ControllerCars from "./ControllerCars";

class ControllerTransactions {
  private _serviceTransactions: ServiceTransactions;

  constructor(serviceTransactions: ServiceTransactions) {
    this._serviceTransactions = serviceTransactions;
  }

  list() {
    return async (req: Request, res: Response) => {
      try {
        const transactions = await this._serviceTransactions.list();
        if (!transactions || transactions.length < 1) {
          return ResponseBuilder.response({
            res,
            code: 401,
            message: "failed",
            data: "Transaction not found",
          });
        }

        return ResponseBuilder.response({
          res,
          code: 200,
          message: "success",
          data: transactions,
        });
      } catch (e) {
        console.log(e);
      }
    };
  }

  findById() {
    return async (req: Request, res: Response) => {
      try {
        const id = +req.params?.id;
        const transaction = await this._serviceTransactions.findById(id);

        if (!transaction) {
          return ResponseBuilder.response({
            res,
            code: 401,
            message: "failed",
            data: transaction,
          });
        }

        return ResponseBuilder.response({
          res,
          code: 200,
          message: "success",
          data: transaction,
        });
      } catch (e) {
        return ResponseBuilder.response({
          res,
          code: 401,
          message: "failed",
          data: e,
        });
      }
    };
  }

  findByUserId() {
    return async (req: Request, res: Response) => {
      try {
        const id = +req.params?.id;
        const transactions = await this._serviceTransactions.findByUserId(id);
        if (!transactions || transactions.length < 1) {
          return ResponseBuilder.response({
            res,
            code: 401,
            message: "failed",
            data: "Transaction not found",
          });
        }

        return ResponseBuilder.response({
          res,
          code: 200,
          message: "success",
          data: transactions,
        });
      } catch (e) {
        console.log(e);
      }
    };
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const params: ITransactions = req.body;
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 86400000);
        const transaction = await this._serviceTransactions.create({
          ...params,
          idUser: Number(params.idUser),
          idCar: Number(params.idCar),
          paymentDeadline: tomorrow.toLocaleString(),
          created_at: today.toLocaleString(),
          updated_at: today.toLocaleString(),
        });
        if (!transaction) {
          return ResponseBuilder.response({
            res,
            code: 401,
            message: "failed",
            data: transaction,
          });
        }

        return ResponseBuilder.response({
          res,
          code: 201,
          message: "success",
          data: transaction,
        });
      } catch (e) {
        return ResponseBuilder.response({
          res,
          code: 401,
          message: "failed",
          data: e,
        });
      }
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const params: ITransactions = req.body;
        const id = +req.params?.id;
        const today = new Date();
        const transaction = await this._serviceTransactions.update(id, {
          ...params,
          updated_at: today.toLocaleString(),
        });
        if (!transaction) {
          return ResponseBuilder.response({
            res,
            code: 401,
            message: "failed",
            data: transaction,
          });
        }

        return ResponseBuilder.response({
          res,
          code: 201,
          message: "success",
          data: transaction,
        });
      } catch (e) {
        return ResponseBuilder.response({
          res,
          code: 401,
          message: "failed",
          data: e,
        });
      }
    };
  }
}

export default ControllerTransactions;
