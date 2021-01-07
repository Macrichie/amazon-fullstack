import express from "express";
import data from "./data.js";

const app = express();
const port = process.env.PORT || 5000;

// Get all product list
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find(item => item._id === req.params.id)
  if(product) {
    res.send(product)
  } else {
    res.status(404).send({message: "Product Not Found!"})
  }
});



app.listen(port, () => {
  console.log(`Server Listening at http:localhost:${port}`);
});
