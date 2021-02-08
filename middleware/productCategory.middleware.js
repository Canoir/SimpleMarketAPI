const config = require("../config/app.config");
//
exports.addProductCategory = async (req, res) => {
  res.app.locals.socketProductCategory.emit(
    "addProductCategory",
    {
      Name: req.body.name,
      Description: req.body.description,
      ParentCategoryId: req.body.parentCategoryId,
      UserId: res.locals.username,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
