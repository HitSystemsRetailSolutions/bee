const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 3013;
  }

  middlewares() {
    this.app.use(cors());
  }

  listen() {
    this.app.listen(3013, () => {
      console.log("Server listening on port " + this.port);
    });
  }
}
