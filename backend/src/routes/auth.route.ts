import { Router } from "express";

import { validate } from "../middlewares";
import { AuthController } from "../controllers";
import Routes from "../interfaces/routes.interface";
import { loginSchema } from "../validators";

class AuthRoutes implements Routes {
  public path = "/api/auth";
  public router = Router();
  public controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/login",
      validate(loginSchema),
      this.controller.postLogin
    );
  }
}

export default AuthRoutes;
