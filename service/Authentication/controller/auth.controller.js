const jwt = require("jsonwebtoken");
const config = require("../config/app.config");
//
exports.login = (socket, userSocket) => {
  socket.on("login", (data, call) => {
    userSocket.emit("login", data, (e) => {
      call(e);
    });
  });
};
exports.verify = (socket) => {
  socket.on("verify", (data, call) => {
    jwt.verify(data.JWT, config.JWTSecret, (err, decode) => {
      if (err) return call({ code: config.accessDeniedCode });
      if (decode)
        return call({
          code: config.successCode,
          roleId: decode.role,
          _id: decode._id,
        });
    });
  });
};
