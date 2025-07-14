import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";

function App() {
  const [itemCount, setItemCount] = useState(0);
  return (
    <div className="container">
      <div className="navbar">
        <span className="shopLogo">Fake shop</span>
        <div className="navbarItem">Home</div>
        <div className="navbarItem">Shop</div>
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
