const { ObjectId, ObjectID } = require("bson");
const config = require("../config/app.config");
//
exports.addProduct = async (socket, db) => {
  socket.on("addProduct", async (data, call) => {
    const { Title, Description, CategoryId, ImageName, Price, UserId } = data;
    if (Title && Description && CategoryId && ImageName && Price && UserId) {
      try {
        await db.collection(config.productCollectionName).insertOne({
          Title: Title,
          Description: Description,
          CategoryId: CategoryId,
          ImageName: ImageName,
          Price: Price,
          //
          InsertDate: new Date(),
          InsertUserId: UserId,
        });
        call({ code: config.successCode });
      } catch (_) {
        if (_.code == 11000) call({ code: config.duplicateKey });
        else call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
exports.updateProduct = async (socket, db) => {
  socket.on("updateProduct", async (data, call) => {
    const {
      _id,
      Title,
      Description,
      CategoryId,
      ImageName,
      Price,
      UserId,
    } = data;
    if (_id) {
      let filter = { _id: ObjectId(_id) };
      let update = { UpdateDate: new Date() };
      if (Title) update = { ...update, Title: Title };
      if (Description) update = { ...update, Description: Description };
      if (CategoryId) update = { ...update, CategoryId: CategoryId };
      if (ImageName) update = { ...update, ImageName: ImageName };
      if (Price) update = { ...update, Price: Price };
      if (UserId) update = { ...update, UpdateUserId: UserId };
      try {
        await db
          .collection(config.productCollectionName)
          .updateOne(filter, { $set: update });
        call({ code: config.successCode });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};

exports.reportByCategory = async (socket, db) => {
  socket.on("reportByCategory", async (data, call) => {
    try {
      const result = db.collection(config.productCollectionName).aggregate([
        {
          $group: {
            _id: "$CategoryId",
            pTitle: { $push: "$Title" },
            pId: { $push: "$_id" },
          },
        },
      ]);
      result.forEach((el) => {
        call({ code: config.successCode, result: el });
      });
    } catch (_) {
      call({ code: config.failureCode });
    }
  });
};
//
exports.searchByTitle = async (socket, db) => {
  socket.on("searchByTitle", async (data, call) => {
    const { Title } = data;
    if (Title) {
      try {
        const result = db
          .collection(config.productCollectionName)
          .find({ Title: { $regex: Title } });
        call({ code: config.successCode, result: await result.toArray() });
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
//
exports.totalPriceByProducts = async (socket, db) => {
  socket.on("totalPriceByProducts", async (data, call) => {
    const { Products } = data;
    if (Products) {
      try {
        let result = 0;
        let counter = 0;
        for (let i = 0; i <= Products.length; i++) {
          if (i == Products.length)
            call({ code: config.successCode, result: result });
          else
            result += Number(
              (
                await db
                  .collection(config.productCollectionName)
                  .findOne({ _id: ObjectID(Products[i]) })
              ).Price
            );
        }
      } catch (_) {
        call({ code: config.failureCode });
      }
    } else call({ code: config.failureCode });
  });
};
