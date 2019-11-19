import * as cors from "cors";
import * as express from "express";
import * as expressLogger from "express-logging";
import * as logger from "logops";
import * as interfaces from "./interfaces";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import { IOHalter } from "./utils/IOHalter";
const cacheControl = require("express-cache-controller");

const { NodePort, BaseUri, environment, frontendDomain } = container.get<any>(
  TYPES.Environment
);

const app = express();

app.set("port", NodePort);

app.use(expressLogger(logger));
app.use(
  cacheControl({
    maxAge: 14400
  })
);

if (environment === "production") {
  app.use(
    cors({
      origin: frontendDomain,
      maxAge: 600
    })
  );
} else {
  app.use(
    cors({
      origin: true,
      maxAge: 600
    })
  );
}

app.options("*", cors());

const initApplication = () => {
  app.listen(app.get("port"), () => {
    console.log(`Application is listening on PORT ${app.get("port")}`);
  });
};

const contentController = container.get<interfaces.IController>(
  TYPES.ContentController
);
const updateController = container.get<interfaces.IController>(
  TYPES.UpdateController
);

if (BaseUri) {
  app.use(BaseUri, contentController.application);
  app.use(BaseUri, updateController.application);
} else {
  app.use(contentController.application);
  app.use(updateController.application);
}

// Just a status endpoint
app.get("/status", (request: express.Request, response: express.Response) => {
  response.send("OK");
});

const ioHalter = container.get<IOHalter>(TYPES.IOHalter);

Promise.all(ioHalter.getAllPromises())
  .then(initApplication)
  .catch(e =>
    console.log("Something went wrong while starting up the application", e)
  );
