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
    // This should be impossible because of the integer restriction on the text
    // inputs, but it doesn't hurt to check.
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
              aria-label={"Decrease quantity by one of" + item.title}
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
              aria-label={"Select quantity to purchase of " + item.title}
              onChange={(event) =>
                onChangeNumberOfItem(event.target.value, item.id)
              }
              value={itemValues[item.id]}
            ></input>
            <button
              aria-label={"Increase quantity by one of " + item.title}
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
              aria-label={"Add selected quantity to cart of " + item.title}
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
