module.exports = {
  auth: require("./auth.middleware"),
  user: require("./user.middleware"),
  productCategory: require("./productCategory.middleware"),
  product: require("./product.middleware"),
  order:require("./order.middleware"),
};
