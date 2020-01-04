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

  //User registration
  router.post("/users", async (req, res) => {
    const newUser = {...req.body, map: `https://maps.googleapis.com/maps/api/staticmap?fillcolor:black&center=${req.body.city},+${req.body.province}+${req.body.postal_code.substring(0,3)}+${req.body.postal_code.substring(3)}&zoom=16&size=400x400&key=${process.env.REACT_APP_API_GOOGLE_API}`}

    console.log(newUser)

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
