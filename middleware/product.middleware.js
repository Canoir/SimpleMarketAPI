const config = require("../config/app.config");
//
exports.addProduct = async (req, res) => {
  res.app.locals.socketProduct.emit(
    "addProduct",
    {
      Title: req.body.title,
      Description: req.body.description,
      CategoryId: req.body.categoryId,
      ImageName: req.file.filename,
      Price: req.body.price,
      UserId: res.locals.username,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
//
exports.updateProduct = async (req, res) => {
  res.app.locals.socketProduct.emit(
    "updateProduct",
    {
      _id: req.body.id,
      Title: req.body.title,
      Description: req.body.description,
      CategoryId: req.body.categoryId,
      ImageName: req.file ? req.file.filename : null,
      Price: req.body.price,
      UserId: res.locals.username,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
//
exports.reportByCategory = async (req, res) => {
  res.app.locals.socketProduct.emit("reportByCategory", {}, (_res) => {
    res.json(_res);
  });
};
//
exports.searchByTitle = async (req, res) => {
  res.app.locals.socketProduct.emit(
    "searchByTitle",
    { Title: req.query.title },
    (_res) => {
      res.json(_res);
    }
  );
};
