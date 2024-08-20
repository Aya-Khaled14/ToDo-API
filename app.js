const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const todoRoutes = require("./routes/todo.js");
const userRoutes = require("./routes/user.js");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // json body



const multer = require("multer");
const { sendMail } = require("./mail.js");

const fileFilterFunction = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only .png"), false);
  }
};

const upload = multer({
  limits: { files: 5 },
  storage: multer.diskStorage({
    destination: "./b",
    filename: (req, file, func) => {
      func(null, file.originalname);
    },
  }),
  dest: "./a",
});

app.use(
  "/test",
  upload.single("img1"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filepath = path.join(__dirname, req.file.path);
    console.log(filepath);
    sendMail(req.file.originalname, req.file.originalname, filepath);
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });

    }
);

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ from: "ErrorHandling Mid", error: message });
});

// catch-all middleware
app.use("*", (req, res, next) => {
  res.sendStatus(404);
});

module.exports = { app };
