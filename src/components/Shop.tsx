import { useOutletContext } from "react-router-dom";
import type { ShoppingItem } from "../ShoppingItem";

function Shop() {
  const {
    increaseItemCount,
    decreaseItemCount,
    shoppingItems,
  }: {
    increaseItemCount: () => void;
    decreaseItemCount: () => void;
    shoppingItems: Array<ShoppingItem>;
  } = useOutletContext();

  return (
    <>
      <h1>This is the shop page </h1>
      <ul>
        {shoppingItems.map((item) => (
          <li>{item.title}</li>
        ))}
      </ul>
      <button onClick={increaseItemCount}>Increase the counter</button>
      <button onClick={decreaseItemCount}>Decrease the counter</button>
    </>
  );
}

export default Shop;
