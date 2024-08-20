const dotenv = require("dotenv");
dotenv.config();

const { app } = require("./app.js"); 
const { connectDB } = require("./db.js");

const port = 3000;

// Start server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});