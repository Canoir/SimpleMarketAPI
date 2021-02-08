const express = require("express");
const app = express();
const io = require("socket.io-client");
const {
  auth,
  user,
  productCategory,
  product,
  order,
} = require("./middleware/middlewares");
const config = require("./config/app.config");
const multer = require("multer");
const productUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "service/product/assets/images/");
    },
    filename: (req, file, cb) => {
      const fileType = file.originalname.split(".");
      cb(
        null,
        file.fieldname + "-" + Date.now() + "." + fileType[fileType.length - 1]
      );
    },
  }),
});
//
app.locals.socketAuth = io(config.authServiceSocketAddress);
app.locals.socketUser = io(config.userServiceSocketAddress);
app.locals.socketProductCategory = io(
  config.productCategoryServiceSocketAddress
);
app.locals.socketProduct = io(config.productServiceSocketAddress);
app.locals.socketOrder = io(config.orderServiceSocketAddress);
//
app.use(express.json());
//
app.post("/login", auth.login);
//^
app.post("/user/add", user.addUser);
app.post("/user/addManager", user.addManager);
//^
app.post(
  "/productCategory/add",
  auth.roleManager([config.Roles.Manager]),
  productCategory.addProductCategory
);
//^
app.post(
  "/product/add",
  auth.roleManager([config.Roles.Manager]),
  productUpload.single("image"),
  product.addProduct
);
app.post(
  "/product/update",
  auth.roleManager([config.Roles.Manager]),
  productUpload.single("image"),
  product.updateProduct
);
app.get(
  "/product/reportByCategory",
  auth.roleManager([config.Roles.Manager]),
  product.reportByCategory
);
app.get(
  "/product/searchByTitle",
  auth.roleManager([config.Roles.Manager, config.Roles.User]),
  product.searchByTitle
);
//^
app.post("/order/add", auth.roleManager([config.Roles.User]), order.addOrder);
app.post(
  "/order/acceptOrder",
  auth.roleManager([config.Roles.Manager]),
  order.acceptOrder
);
app.get(
  "/order/reportAll",
  auth.roleManager([config.Roles.Manager]),
  order.reportAll
);
app.get(
  "/order/reportByUserId",
  auth.roleManager([config.Roles.Manager, config.Roles.User]),
  order.reportByUserId
);
app.post(
  "/order/reportByDate",
  auth.roleManager([config.Roles.Manager]),
  order.reportByDate
);
app.get(
  "/order/userSumBuys",
  auth.roleManager([config.Roles.Manager]),
  order.userSumBuys
);
//
app.listen(config.port);
