const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 3013;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
  }

  routes() {
    this.app.use("/notificaciones", require("../routes/notificaciones"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port " + this.port);
    });
  }
}

module.exports = Server;
