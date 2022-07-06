import App from "./app";

import { AuthRoutes, MessageRoutes } from "./routes";

const app = new App([new AuthRoutes(), new MessageRoutes()]);

app.listen();
