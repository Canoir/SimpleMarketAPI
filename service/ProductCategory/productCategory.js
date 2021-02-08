const express = require("express");
const app = express();
const server = require("http").createServer(app);
const config = require("./config/app.config");
const { addCategory } = require("./controller/category.controller");
const { socketConfig } = require("./utils/engine");
//
require("./model/db")((db) => {
  socketConfig(require("socket.io")(server), sockets, db);
});
//
async function sockets(socket, db) {
  addCategory(socket, db);
}
server.listen(config.port);
