const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
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
    const newUser = req.body;

    try {
      let user = await database.getUserByEmail(db, newUser.email);

      if (user.length !== 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(12);

      newUser.password = await bcrypt.hash(newUser.password, salt);

      user = await database.addUser(db, newUser);

      const payload = {
        user: {
          id: user[0].id
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
