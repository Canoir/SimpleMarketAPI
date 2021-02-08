const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app.config");
//
exports.login = (socket, db) => {
  socket.on("login", async (data, call) => {
    if (data.UserPass) {
      const UserPass = Buffer.from(data.UserPass, "base64")
        .toString("ascii")
        .split(":");
      const Username = UserPass ? UserPass[0] : "";
      const Password = UserPass ? UserPass[1] : "";
      if (!Username) return call({ code: config.accessDeniedCode });
      const user = await db
        .collection(config.userCollectionName)
        .findOne({ _id: Username });
      if (user) {
        if (bcrypt.compare(Password, user.Password)) {
          const JWT = await jwt.sign(
            { role: user.RoleId, _id: user._id },
            config.JWTSecret,
            {
              expiresIn: config.JWTExpiresIn,
            }
          );
          call({ code: config.successCode, Token: JWT });
        }
      } else call({ code: config.accessDeniedCode });
    } else {
      call({ code: config.failureCode });
    }
  });
};
exports.addUser = async (socket, db) => {
  socket.on("addUser", async (data, call) => {
    const UserPass = Buffer.from(data.UserPass, "base64")
      .toString("ascii")
      .split(":");
    const Username = UserPass ? UserPass[0] : "";
    const Password = UserPass ? UserPass[1] : "";
    const Name = data.Name ? data.Name : "";
    if (Username && Password && Name) {
      try {
        await db.collection(config.userCollectionName).insertOne({
          _id: Username,
          Password: await bcrypt.hash(Password, config.hashRounds),
          Name: Name,
          RoleId: config.Roles.User,
          //
          InsertDate: new Date(),
          InsertUserId: -1,
        });
        const JWT = await jwt.sign(
          { role: config.Roles.User, _id: Username },
          config.JWTSecret,
          {
            expiresIn: config.JWTExpiresIn,
          }
        );
        call({ code: config.successCode, JWT: JWT });
      } catch (_) {
        if (_.code == 11000) call({ code: config.duplicateUserName });
        else call({ code: config.failureCode });
      }
    } else {
      call({ code: config.failureCode });
    }
  });
};
exports.addManager = async (socket, db) => {
  socket.on("addManager", async (data, call) => {
    const UserPass = Buffer.from(data.UserPass, "base64")
      .toString("ascii")
      .split(":");
    const Username = UserPass ? UserPass[0] : "";
    const Password = UserPass ? UserPass[1] : "";
    const Name = data.Name ? data.Name : "";
    if (Username && Password && Name) {
      try {
        await db.collection(config.userCollectionName).insertOne({
          _id: Username,
          Password: await bcrypt.hash(Password, config.hashRounds),
          Name: Name,
          RoleId: config.Roles.Manager,
          //
          InsertDate: new Date(),
          InsertUserId: -1,
        });
        const JWT = await jwt.sign(
          { role: config.Roles.Manager, _id: Username },
          config.JWTSecret,
          {
            expiresIn: config.JWTExpiresIn,
          }
        );
        call({ code: config.successCode, JWT: JWT });
      } catch (_) {
        if (_.code == 11000) call({ code: config.duplicateUserName });
        else call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
