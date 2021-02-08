const { ObjectId } = require("bson");
const config = require("../config/app.config");
//
exports.addOrder = async (socket, db) => {
  socket.on("addOrder", async (data, call) => {
    const { Products, UserId, Address, TotalPrice } = data;
    if (Products && UserId && Address && TotalPrice) {
      try {
        await db.collection(config.orderCollectionName).insertOne({
          Address: Address,
          Products: Products,
          Accepted: false,
          TotalPrice: TotalPrice,
          //
          InsertDate: new Date(),
          InsertUserId: UserId,
        });
        call({ code: config.successCode });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
exports.acceptOrder = async (socket, db) => {
  socket.on("acceptOrder", async (data, call) => {
    const { Id, UserId } = data;

    if (Id && UserId) {
      try {
        await db.collection(config.orderCollectionName).updateOne(
          { _id: ObjectId(Id) },
          {
            $set: {
              Accepted: true,
              UpdateDate: new Date(),
              UpdateUserId: UserId,
            },
          }
        );
        call({ code: config.successCode });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
//
exports.reportAll = async (socket, db) => {
  socket.on("reportAll", async (data, call) => {
    try {
      const result = db.collection(config.orderCollectionName).find({});
      call({ code: config.successCode, result: await result.toArray() });
    } catch (_) {
      call({ code: config.failureCode });
    }
  });
};
//
exports.reportByUserId = async (socket, db) => {
  socket.on("reportByUserId", async (data, call) => {
    const { UserId } = data;
    if (UserId) {
      try {
        const result = db.collection(config.orderCollectionName).aggregate([
          {
            $match: { InsertUserId: UserId },
          },
          {
            $group: {
              _id: "$InsertUserId",
              address: { $push: "$Address" },
              products: { $push: "$Products" },
              accepted: { $push: "$Accepted" },
            },
          },
        ]);
        call({ code: config.successCode, result: await result.toArray() });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
//
exports.reportByDate = async (socket, db) => {
  socket.on("reportByDate", async (data, call) => {
    const { _Date } = data;
    if (_Date) {
      try {
        let date = _Date.split("/");
        const startDate = new Date(date[0] + "-" + date[1] + "-" + date[2]);
        date = new Date(date[0] + "-" + date[1] + "-" + date[2]);
        date.setDate(date.getDate() + 1);
        const endDate = date;
        const result = db.collection(config.orderCollectionName).aggregate([
          {
            $match: {
              InsertDate: {
                $gte: startDate,
                $lt: endDate,
              },
            },
          },
          {
            $group: {
              _id: "$InsertDate",
              address: { $push: "$Address" },
              products: { $push: "$Products" },
              accepted: { $push: "$Accepted" },
            },
          },
        ]);
        call({ code: config.successCode, result: await result.toArray() });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
//
exports.userSumBuys = async (socket, db) => {
  socket.on("userSumBuys", async (data, call) => {
    const { UserId } = data;
    if (UserId) {
      try {
        const result = db.collection(config.orderCollectionName).aggregate([
          {
            $match: { InsertUserId: UserId, Accepted: true },
          },
          {
            $group: {
              _id: "$InsertUserId",
              totalPrice: { $sum: "$TotalPrice" },
            },
          },
        ]);
        call({ code: config.successCode, result: await result.toArray() });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
