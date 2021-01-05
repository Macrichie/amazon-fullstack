import express from "express";
import data from "./data.js";

const app = express();
const port = process.env.PORT || 5000;

// Get all product list
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.listen(port, () => {
  console.log(`Server Listening at http:localhost:${port}`);
});
