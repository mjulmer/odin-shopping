import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import type { ShoppingItem } from "./ShoppingItem";
import "./styles.css";

function App() {
  const [itemCount, setItemCount] = useState(0);
  const [shoppingItems, setShoppingItems] = useState<Array<ShoppingItem>>([
    { id: "0", name: "Embersilk bag", price: 3 },
    { id: "1", name: "Linen Tunic", price: 0.5 },
  ]);

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
