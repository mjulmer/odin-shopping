import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import type { ShoppingItem } from "./ShoppingItem";
import "./styles.css";

function App() {
  const [itemCount, setItemCount] = useState(0);
  const [shoppingItems, setShoppingItems] = useState<Array<ShoppingItem>>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Got bad status code" + response.status + "from fake store API."
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setShoppingItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        <span className="shopLogo">Fake shop</span>
        <div className="navbarItem">
          <Link to="/">Home</Link>
        </div>
        <div className="navbarItem">
          <Link to="/shop">Shop</Link>
        </div>
        <div className="navbarItem">Cart ({itemCount})</div>
      </div>

      <Outlet
        context={{
          increaseItemCount: () => setItemCount(itemCount + 1),
          decreaseItemCount: () => setItemCount(itemCount - 1),
          shoppingItems: shoppingItems,
        }}
      />
    </div>
  );
}

export default App;
