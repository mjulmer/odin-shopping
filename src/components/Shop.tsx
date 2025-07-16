import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import type { ShoppingItem } from "../ShoppingItem";
import "./shop.css";

function Shop() {
  const {
    increaseItemCount,
    shoppingItems,
  }: {
    increaseItemCount: (valueToAdd: number) => void;
    shoppingItems: Array<ShoppingItem>;
  } = useOutletContext();

  // Bug - if initial object is populated before items loaded, the items won't
  // get correctly initialized.
  const [itemValues, setItemValues] = useState<{ [itemId: string]: number }>(
    useMemo(
      () =>
        shoppingItems.reduce(
          (valuesObj, shoppingItem) => ({ ...valuesObj, [shoppingItem.id]: 0 }),
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
    <>
      <h1>This is the shop page </h1>
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
                onClick={() => increaseItemCount(itemValues[item.id])}
              >
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
