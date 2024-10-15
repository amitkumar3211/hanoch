const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./index");

// Connect to MongoDB

// const url = "mongodb://Optimize:Optimize!~257545@localhost:27017/optimize";

const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
const DATABASE = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const url = NODE_ENV === "development" ? DATABASE_LOCAL : DATABASE;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Start the Express server on port 3000
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
