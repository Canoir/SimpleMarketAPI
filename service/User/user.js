const express = require("express");
const app = express();
const server = require("http").createServer(app);
const config = require("./config/app.config");
const { login, addUser, addManager } = require("./controller/user.controller");
const { socketConfig } = require("./utils/engine");
//
require("./model/db")((db) => {
  socketConfig(require("socket.io")(server), sockets, db);
});
//
//
async function sockets(socket, db) {
  login(socket, db);
  addUser(socket, db);
  addManager(socket, db);
}
server.listen(config.port);
