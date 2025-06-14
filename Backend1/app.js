const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const UserRoutes = require("./routes/UserRoutes");
const morgan = require("morgan");
const ProductRoutes = require("./routes/ProductRoute");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors=require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("This is get method");
});
app.use("/products", ProductRoutes);
app.use("/user", UserRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl}`);
  next(err);
});


async function DBConnection(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("DB connection successfull");
  } catch (err) {
    console.log("Not connected to DB");
  }
}

DBConnection();

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Running in the PORT ${PORT}`);
});
