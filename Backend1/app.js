const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const UserRoutes = require("./routes/UserRoutes");
const morgan = require("morgan");
const ProductRoutes = require("./routes/ProductRoute");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("This is get method");
});
app.use("/products", ProductRoutes);
app.use("/user", UserRoutes);

async function DBConnection() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("DB connection successfull");
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

DBConnection();



app.listen(PORT, () => {
  console.log(`Running in the PORT ${PORT}`);
});
