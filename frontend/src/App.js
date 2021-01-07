import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Amazon FS
            </a>
          </div>
          <div className="menu">
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route exact path="/" component={HomeScreen}></Route>
        </main>
        <footer>Designed by Olakunle</footer>
      </div>
    </Router>
  );
}

export default App;
