import express from "express";
import data from "./data.js";

const app = express();
const port = process.env.PORT || 5000;
const { products } = data
console.log(typeof products)

// list all product
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// get all products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
// get a product
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find(x => x._id === req.params.id)
  console.log(req.params.id)
  // console.log(product)
  if(product) {
    res.send(product)
  } else {
    res.status(404).send({message: "Product Not Found!"})
  }
});




app.listen(port, () => {
  console.log(`Server Listening at http:localhost:${port}`);
});
