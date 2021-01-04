import React from "react";
import Product from "./components/Product";
import data from "./data";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <header>
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
          <div className="row center">
            {data.products.map((product) => (
              <Product key={product._id} product={product}/>
            ))}
          </div>
        </main>
        <footer>Designed by Olakunle</footer>
      </div>
    </div>
  );
}

export default App;
