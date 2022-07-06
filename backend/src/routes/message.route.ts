import { Router } from "express";

import { auth, validate } from "../middlewares";
import { MessageController } from "../controllers";
import Routes from "../interfaces/routes.interface";
import { messageSchema } from "../validators";

class MessageRoutes implements Routes {
  public path = "/api/messages";
  public router = Router();
  public controller = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.controller.getMessages);
    this.router.post(
      "/",
      auth,
      validate(messageSchema),
      this.controller.postMessage
    );
  }
}

export default MessageRoutes;
