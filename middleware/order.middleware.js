const config = require("../config/app.config");
//
exports.addOrder = async (req, res) => {
  res.app.locals.socketProduct.emit(
    "totalPriceByProducts",
    {
      Products: req.body.products,
    },
    (total) => {
      if (total)
        res.app.locals.socketOrder.emit(
          "addOrder",
          {
            Address: req.body.address,
            Products: req.body.products,
            TotalPrice: total.result,
            UserId: res.locals.username,
          },
          (_res) => {
            res.json(_res);
          }
        );
      else res.json({ code: config.failureCode });
    }
  );
};
//
exports.acceptOrder = async (req, res) => {
  res.app.locals.socketOrder.emit(
    "acceptOrder",
    {
      Id: req.body.id,
      UserId: res.locals.username,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
//
exports.reportAll = async (req, res) => {
  res.app.locals.socketOrder.emit("reportAll", {}, (_res) => {
    res.json(_res);
  });
};
//
exports.reportByUserId = async (req, res) => {
  res.app.locals.socketOrder.emit(
    "reportByUserId",
    {
      UserId: req.query.username,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
//
exports.reportByDate = async (req, res) => {
  res.app.locals.socketOrder.emit(
    "reportByDate",
    {
      _Date: req.body.date,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
//
exports.userSumBuys = async (req, res) => {
  res.app.locals.socketOrder.emit(
    "userSumBuys",
    {
      UserId: req.query.username,
    },
    (_res) => {
      res.json(_res);
    }
  );
}