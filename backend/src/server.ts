import App from "./app";

import { AuthRoutes, MessageRoutes } from "./routes";
import ProjectRoute from "./routes/project.route";

const app = new App([
  new AuthRoutes(),
  new MessageRoutes(),
  new ProjectRoute(),
]);

app.listen();
