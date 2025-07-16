import { useOutletContext } from "react-router-dom";
import type { ShoppingItem } from "../ShoppingItem";
import "./shop.css";
import ShoppingItems from "./ShoppingItems";

function Shop() {
  const {
    shoppingItems,
  }: {
    shoppingItems: Array<ShoppingItem>;
  } = useOutletContext();

  return (
    <>
      <h1>This is the shop page </h1>
      {shoppingItems.length ? <ShoppingItems /> : <p>Loading...</p>}
    </>
  );
}

export default Shop;
