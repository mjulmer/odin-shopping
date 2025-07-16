import { useOutletContext } from "react-router-dom";
import type { ShoppingItem } from "../ShoppingItem";
import "./shop.css";
import ShoppingItems from "./ShoppingItems";

function Shop() {
  const {
    shoppingItems,
    didDataFetchFail,
  }: {
    shoppingItems: Array<ShoppingItem>;
    didDataFetchFail: boolean;
  } = useOutletContext();

  return (
    <>
      <h1>This is the shop page </h1>
      {didDataFetchFail ? (
        <p>An error occured and the items could not be loaded.</p>
      ) : shoppingItems.length ? (
        <ShoppingItems />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Shop;
