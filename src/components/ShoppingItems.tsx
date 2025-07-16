import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import type { ShoppingItem } from "../ShoppingItem";
import "./shop.css";

function ShoppingItems() {
  const {
    increaseItemCount,
    shoppingItems,
  }: {
    increaseItemCount: (valueToAdd: number) => void;
    shoppingItems: Array<ShoppingItem>;
  } = useOutletContext();

  const [itemValues, setItemValues] = useState<{ [itemId: string]: number }>(
    useMemo(
      () =>
        shoppingItems.reduce(
          (valuesObj, item) => ({ ...valuesObj, [item.id]: 0 }),
          {}
        ),
      [shoppingItems]
    )
  );

  function onChangeNumberOfItem(newValue: string, eventId: string) {
    let intValue = parseInt(newValue);
    // If the user has a valid integer product quantity, then types in
    // "flingibbit" and then hits "add to cart", no item should be added.
    if (Number.isNaN(intValue)) {
      intValue = 0;
    }
    if (intValue < 0) {
      intValue = 0;
    }
    setItemValues({ ...itemValues, [eventId]: intValue });
  }

  return (
    <div className="shopItemsContainer">
      {shoppingItems.map((item) => (
        <div className="shopItem" key={item.id}>
          <img src={item.image} alt=""></img>
          <p>{item.title}</p>
          <span>
            <button
              aria-label="Decrease by one"
              onClick={() =>
                onChangeNumberOfItem(
                  (itemValues[item.id] - 1).toString(),
                  item.id
                )
              }
            >
              -
            </button>
            <input
              type="integer"
              onChange={(event) =>
                onChangeNumberOfItem(event.target.value, item.id)
              }
              value={itemValues[item.id]}
            ></input>
            <button
              aria-label="Increase by one"
              onClick={() =>
                onChangeNumberOfItem(
                  (itemValues[item.id] + 1).toString(),
                  item.id
                )
              }
            >
              +
            </button>
            <button
              className="addToCart"
              onClick={() => {
                increaseItemCount(itemValues[item.id]);
                setItemValues({ ...itemValues, [item.id]: 0 });
              }}
            >
              Add to cart
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ShoppingItems;
