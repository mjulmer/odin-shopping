import { useOutletContext } from "react-router-dom";
import type { ShoppingItem } from "../ShoppingItem";
import "./shop.css";

function Shop() {
  const {
    increaseItemCount,
    shoppingItems,
  }: {
    increaseItemCount: () => void;
    shoppingItems: Array<ShoppingItem>;
  } = useOutletContext();

  return (
    <>
      <h1>This is the shop page </h1>
      <div className="shopItemsContainer">
        {shoppingItems.map((item) => (
          <div className="shopItem" key={item.id}>
            <img src={item.image} alt=""></img>
            <p>{item.title}</p>
            <span>
              <button
                aria-label="Increase by one"
                onClick={() => console.log("unimplemented")}
              >
                -
              </button>
              <input type="integer"></input>
              <button
                aria-label="Decrease by one"
                onClick={() => console.log("unimplemented")}
              >
                +
              </button>
              <button className="addToCart" onClick={increaseItemCount}>
                Add to cart
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Shop;
