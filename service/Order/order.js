const express = require("express");
const app = express();
const server = require("http").createServer(app);
const config = require("./config/app.config");
const {
  addOrder,
  acceptOrder,
  reportAll,
  reportByUserId,
  reportByDate,
  userSumBuys
} = require("./controller/order.controller");
const { socketConfig } = require("./utils/engine");
//
require("./model/db")((db) => {
  socketConfig(require("socket.io")(server), sockets, db);
});
//
async function sockets(socket, db) {
  addOrder(socket, db);
  acceptOrder(socket, db);
  reportAll(socket, db);
  reportByUserId(socket, db);
  reportByDate(socket, db);
  userSumBuys(socket, db);
}
server.listen(config.port);
