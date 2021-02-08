const config = require("../config/app.config");

module.exports = {
  socketConfig: (io, callback, db) => {
    io.on("connect", (socket) => {
      if (io.engine.clientsCount > config.maxSocketConnections)
        socket.disconnect();
      else {
        console.log("Connected!");
        callback(socket, db);
      }
    });
  },
};
