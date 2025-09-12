import express from "express";
import cors from "cors";

import root from "./routers/root.js";
import user from "./routers/user.js";
import bili from "./routers/bili.js";
import ResultResp from "./results/index.js";

const HOST = "0.0.0.0";
const PORT = 3007;
const app = express();

const authKeyValidate = (key) => {
  return function (req, res, next) {
    if (req.headers.token != key) {
      res.status(403).send(ResultResp.AUTH_FAILED());
      res.end();
    } else {
      next();
    }
  };
};

function serviceInit(key) {
  app.use(cors());
  if (!process.env.VITE_DEV_SERVER_URL) {
    app.use(authKeyValidate(key));
  }
  app.use("/", root);
  app.use("/user", user);
  app.use("/bili", bili);

  app.listen(PORT, () => {
    console.info(`Panel2Re Service is listening on port ${PORT}`);
  });
}

export { serviceInit, PORT as servicePort };
