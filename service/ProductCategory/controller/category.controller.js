const config = require("../config/app.config");
//
exports.addCategory = async (socket, db) => {
  socket.on("addProductCategory", async (data, call) => {
    const { Name, Description, ParentCategoryId, UserId } = data;
    if (Name && Description && UserId) {
      try {
        await db.collection(config.categoryCollectionName).insertOne({
          Name: Name,
          Description: Description,
          ParentCategoryId: ParentCategoryId,
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
