const router = require("express").Router();
const database = require("../db/database.js");
const auth = require("../middleware/auth");

module.exports = db => {
  router.get("/items", (req, res) => {
    db.query(`SELECT * FROM items`).then(({ rows: items }) => {
      res.json(items);
    });
  });

  router.post("/items", async (req, res) => {
    try {
      let item = await database.addItem(db, req.body);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.delete("/items/delete/:id", (req, res) => {
    const itemId = req.params.id;
    database.deleteItemById(db, itemId)
    .then(() => {
      res.send('done');
    })
  })

  return router;
};
