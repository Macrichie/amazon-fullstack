import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/amazonfs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const port = process.env.PORT || 5000;
const { products } = data;

// get a product
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  console.log(req.params.id);
  // console.log(product)
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found!" });
  }
});

// get all products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.use("/api/users", userRouter);
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
