const express = require("express");
const app = express();
const server = require("http").createServer(app);
const config = require("./config/app.config");
const {
  addProduct,
  updateProduct,
  reportByCategory,
  searchByTitle,
  totalPriceByProducts
} = require("./controller/product.controller");
const { socketConfig } = require("./utils/engine");
//
require("./model/db")((db) => {
  socketConfig(require("socket.io")(server), sockets, db);
});
//
async function sockets(socket, db) {
  addProduct(socket, db);
  updateProduct(socket, db);
  reportByCategory(socket, db);
  searchByTitle(socket, db);
  totalPriceByProducts(socket, db);
}
server.listen(config.port);
