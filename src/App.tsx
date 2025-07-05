import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [itemCount, setItemCount] = useState(0);
  return (
    <>
      <p>Nav bar will go here</p>
      <p>Nav bar has shopping cart item counter: {itemCount}</p>
      <Outlet
        context={[
          () => setItemCount(itemCount + 1),
          () => setItemCount(itemCount - 1),
        ]}
      />
    </>
  );
}

export default App;
