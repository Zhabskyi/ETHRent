const router = require("express").Router();

module.exports = db => {
  router.get("/transactions", (request, response) => {
    db.query(
      `
      SELECT * FROM transactions
    `
    ).then(({ rows: transactions }) => {
      res.json(transactions);
    });
  });

  return router;
};
