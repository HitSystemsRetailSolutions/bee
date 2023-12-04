const Server = require("./server/Models/Server");
require("dotenv").config({ path: `${__dirname}/.env` });

const server = new Server();

server.listen();
