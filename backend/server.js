import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config()

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/amazonfs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const port = process.env.PORT || 5000;

// parse application/json
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
// list all product
app.get("/", (req, res) => {
  res.send("Server is up and running");
});
// Error Handler
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})

app.listen(port, () => {
  console.log(`Server Listening at http:localhost:${port}`);
});
