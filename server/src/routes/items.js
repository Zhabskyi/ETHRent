const router = require("express").Router();
const database = require("../db/database.js");
const auth = require("../middleware/auth");

require("dotenv").config();
const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = db => {

  router.get("/items", (req, res) => {
    db.query(`SELECT * FROM items`).then(({ rows: items }) => {
      res.json(items);
    });
  });

  router.get("/items/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const userInfo = await database.getUserInfoForItem(db, userId);
      res.json(userInfo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Edit item information
  router.put("/items/:id", upload.single("file"), async (req, res) => {
    const itemId = req.params.id;
    let info = req.body;

    try {
      const file = req.file;
      const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

      let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });

      //Where you want to store your file

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
      };

      s3bucket.upload(params, async (err, data) => {
        try {
          if (err) {
            res.status(500).json({ error: true, Message: err });
          } else {
            const newFileUploaded = {
              description: req.body.description,
              fileLink: s3FileURL + file.originalname,
              s3_key: params.Key
            };
            info = { ...info, photo: newFileUploaded.fileLink };
            // Add all info to database after store picture to S3
            const items = await database.updateItem(db, info, itemId);
            res.send(items);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  //Delete Item
  router.delete("/items/delete/:id", (req, res) => {
    const itemId = req.params.id;
    database
      .deleteItemById(db, itemId)
      .then(() => {
        res.send("done");
      })
      .catch(e => res.send(e));
  });

  //Add item
  router.post("/items", upload.single("file"), async (req, res) => {
    let info = req.body;

    try {
      const file = req.file;
      const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

      let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });

      //Where you want to store your file

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
      };

      s3bucket.upload(params, async (err, data) => {
        try {
          if (err) {
            res.status(500).json({ error: true, Message: err });
          } else {
            const newFileUploaded = {
              description: req.body.description,
              fileLink: s3FileURL + file.originalname,
              s3_key: params.Key
            };
            info = { ...info, photo: newFileUploaded.fileLink };
            // Add all info to database after store picture to S3
            const items = await database.addItem(db, info);
            res.send(items);
          }
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  return router;
};
