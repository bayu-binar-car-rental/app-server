import { Request, Response } from "express";

import { IUser } from "../models/Users";
import ServiceUsers from "../services/ServiceUsers";
import { authorizeJwt } from "../utils/encryptions";

export default class ControllerUsers {
  private _serviceUsers: ServiceUsers;

  constructor(serviceUsers: ServiceUsers) {
    this._serviceUsers = serviceUsers;
  }

  list() {
    return async (req: Request, res: Response) => {
      try {
        const response = await this._serviceUsers.list();

        if (response.length < 1) {
          return res.status(401).json({
            meta: {
              code: 401,
              status: "failed",
              success: false,
            },
            data: "Users not found",
          });
        }

        return res.status(200).json({
          meta: {
            code: 200,
            status: "success",
            success: true,
          },
          data: response,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          meta: {
            code: 500,
            status: "failed",
            success: false,
          },
          data: "Server error occured",
        });
      }
    };
  }

  login() {
    return async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body as IUser;
        const response = await this._serviceUsers.login({ email, password });

        if (!response) {
          let data = "";
          if (response === undefined) {
            data = "Account not found";
          } else {
            data = "Email or Password is incorrect";
          }
          return res.status(401).json({
            meta: {
              code: 401,
              status: "failed",
              success: false,
            },
            data: data,
          });
        }

        return res.status(200).json({
          meta: {
            code: 200,
            status: "success",
            success: true,
          },
          data: response,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          meta: {
            code: 500,
            status: "failed",
            success: false,
          },
          data: "Server error occured",
        });
      }
    };
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const response = await this._serviceUsers.create(req.body);

        if (
          response === "Email already exists" ||
          response === "Username already exists" ||
          response === "Password length must be more than 6 characters" ||
          !response
        ) {
          return res.status(401).json({
            meta: {
              code: 401,
              status: "failed",
              success: false,
            },
            data: response,
          });
        }

        return res.status(201).json({
          meta: {
            code: 201,
            status: "success",
            success: true,
          },
          data: response,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          meta: {
            code: 500,
            status: "failed",
            success: false,
          },
          data: "Server error occured",
        });
      }
    };
  }

  check() {
    return (req: Request, res: Response) => {
      const authHeader = req.headers.authorization as string;
      const token = authHeader && authHeader.split(" ")[1];
      const response = authorizeJwt(token) as any;

      if (response.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token Expired. Please login",
          data: response,
        });
      }

      if (response.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "JWT must be provided",
          data: response,
        });
      }

      if (!response) {
        return res.status(401).json({
          message: "Unauthorized user",
          data: response,
        });
      }

      return res.status(200).json({
        message: "Authorized user",
        data: response,
      });
    };
  }
}
