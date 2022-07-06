import { Router } from "express";

import { auth, validate, validateObjectId } from "../middlewares";
import { ProjectController } from "../controllers";
import Routes from "../interfaces/routes.interface";
import { projectSchema, tagSchema } from "../validators";

class MessageRoutes implements Routes {
  public path = "/api/projects";
  public router = Router();
  public controller = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/tags", auth, this.controller.getTags);
    this.router.post(
      "/tags",
      auth,
      validate(tagSchema),
      this.controller.postTag
    );
    this.router.get("/", this.controller.getProjects);
    this.router.post(
      "/",
      auth,
      validate(projectSchema),
      this.controller.postProject
    );
    this.router.delete(
      "/:id",
      auth,
      validateObjectId("id"),
      this.controller.deleteProject
    );
    this.router.put(
      "/:id",
      auth,
      validateObjectId("id"),
      validate(projectSchema),
      this.controller.putProject
    );
  }
}

export default MessageRoutes;
