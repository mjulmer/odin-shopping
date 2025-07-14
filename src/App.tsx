import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";

function App() {
  const [itemCount, setItemCount] = useState(0);
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
        context={[
          () => setItemCount(itemCount + 1),
          () => setItemCount(itemCount - 1),
        ]}
      />
    </div>
  );
}

export default App;
