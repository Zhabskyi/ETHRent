const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');
const database = require("../db/database.js");


module.exports = db => {
  router.get("/users", (req, res) => {
    db.query(
      `
      SELECT * from users;
    `
    ).then(({ rows: users }) => {
      res.json(users);
    });
  });

  router.post("/users", async (req, res) => {
    const user = req.body;

    try {
      let newUser = await database.getUserByEmail(db, user.email);

      if (newUser.length !== 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(user.password, salt);

      newUser = await database.addUser(db, user);

      const payload = {
        newUser: {
          id: newUser[0].id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  return router;
};
