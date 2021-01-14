import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./pages/CartScreen";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import RegisterScreen from "./pages/RegisterScreen";
import SigninScreen from "./pages/SigninScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

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
            <Link to="/cart">
              <span>
                <i
                  className="fa fa-shopping-cart cart-icon"
                  aria-hidden="true"
                ></i>
              </span>

              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <div className="welcome">
                  Hello,
                  <Link to="#">
                    {userInfo.name}
                    <i className="fa fa-caret-down arrow"></i>
                  </Link>
                </div>{" "}
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route exact path="/" component={HomeScreen}></Route>
        </main>
        <footer>Designed by Olakunle</footer>
      </div>
    </Router>
  );
}

export default App;
