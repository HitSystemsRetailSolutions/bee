const Server = require("./server/Models/Server");
require("dotenv").config();

const server = new Server();

server.listen();
