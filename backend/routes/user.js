import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import database from "../database/database.js";

const user = express.Router();

// multer config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let uniquePhotoName = "";

const storage = multer.diskStorage({
  destination: path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    "assets",
    "uploads"
  ),
  filename: (req, file, cb) => {
    uniquePhotoName = `${Date.now()}-${file.originalname}`;
    cb(null, uniquePhotoName);
  },
});

const upload = multer({ storage });

// login
user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  database.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }

    // user doesn't exist
    if (results.length === 0) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const user = results[0];
    const hashedPassword = user.pwd;

    try {
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        res.status(200).json({
          message: "Authentication correctly",
          id: user.id,
          username: user.username,
        });
      } else {
        // incorrect password
        res.status(401).json({ error: "Incorrect password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });
});

// register
user.post("/register", upload.single("photo"), async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO users(username, description, photo, email, pwd) VALUES(?,?,?,?,?)";
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const values = [
    data.username,
    data.description,
    uniquePhotoName,
    data.email,
    hashedPassword,
  ];

  database.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send({ message: `Error while saving data ${result}` });
      return;
    }

    res.status(200).send({ message: "Data saved well" });
  });
});

// my info
user.post("/my-info", (req, res) => {
  const myId = req.body.id;

  if (!myId) {
    res.status(400).send({ message: "Missing user ID" });
    return;
  }

  const query = "SELECT * FROM users WHERE id = ?";

  database.query(query, myId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error while searching your info" });
      return;
    }

    res.status(200).send(result);
  });
});


// get all users
user.get("/users", (req, res) => {
  const query = "SELECT * FROM users";

  database.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }

    res.json(result);
  });
});

export default user;
