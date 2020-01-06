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

  router.post("/items/upload", upload.single("file"), (req, res) => {
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

      s3bucket.upload(params, (err, data) => {
        if (err) {
          res.status(500).json({ error: true, Message: err });
        } else {
          const newFileUploaded = {
            description: req.body.description,
            fileLink: s3FileURL + file.originalname,
            s3_key: params.Key
          };
          info = { ...info, photo: newFileUploaded.fileLink };
          database
            .addItem(db, info)
            .then(items => {
              res.send(items);
            })
            .catch(e => res.send(e));
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  return router;
};
