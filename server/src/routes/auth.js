const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const database = require("../db/database.js");

//Get logged in user

module.exports = db => {
  router.get("/auth", auth, async (req, res) => {
    try {
      const user = await database.getUserById(db, req.user.id);
      res.json(user);
    } catch (err) {
      //console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Authorize user and get token
  router.post("/auth", async (req, res) => {
    try {
      let user = await database.getUserByEmail(db, req.body.email);

      if (user.length === 0) {
        return res
          .status(400)
          .json({ msg: "Can not find the user, check input!" });
      }

      const isCompare = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (!isCompare) {
        return res
          .status(400)
          .json({ msg: "Can not find the user, check input" });
      }

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
