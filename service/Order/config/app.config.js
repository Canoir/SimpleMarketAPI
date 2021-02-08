module.exports = {
  mongoDbUrl: "mongodb://localhost:27017",
  dbName: "SimpleMarketAPI_Order",
  mongodbConnectionFailureLog: "Mongodb connection failed!",
  mongodbConnectionSuccessLog: "Connected successfully to Mongodb!",
  maxSocketConnections: 1,
  port: 3004,
  orderCollectionName: "order",
  hashRounds: 8,
  successCode: 200,
  failureCode: 503,
  duplicateKey: 501,
};
