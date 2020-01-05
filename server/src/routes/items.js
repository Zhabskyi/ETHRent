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
      await database.addItem(db, req.body);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.put("/items/:id", async (req, res) => {
    const itemId = req.params.id;
    try {
      await database.updateItem(db, req.body, itemId);
      item = {
        ...req.body,
        id: itemId,
        photo:
          "https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      };
      res.send(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.delete("/items/delete/:id", (req, res) => {
    const itemId = req.params.id;
    database.deleteItemById(db, itemId).then(() => {
      res.send("done");
    });
  });

  return router;
};
