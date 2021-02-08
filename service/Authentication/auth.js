const express = require("express");
const app = express();
const server = require("http").createServer(app);
const config = require("./config/app.config");
const io = require("socket.io-client");
const { login, verify } = require("./controller/auth.controller");
const { socketConfig } = require("./utils/engine");
//
socketConfig(require("socket.io")(server), sockets);
//
async function sockets(socket) {
  const userSocket = io(config.userServiceSocketAddress);
  //
  login(socket, userSocket);
  verify(socket);
}
//
server.listen(config.port);
