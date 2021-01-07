import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;
  // console.log(cartItems)
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Amazon FS
            </Link>
          </div>
          <div className="menu">
            <Link to="/cart">Cart
              {
                cartItems.length > 0 && (
                  // <ShoppingCartOutlinedIcon>
                  //   {cartItems.length}
                  // </ShoppingCartOutlinedIcon>
                  <span className="badge">{cartItems.length}</span>
                )
              }
            </Link>
            <Link to="/signin">Sign In</Link>
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
