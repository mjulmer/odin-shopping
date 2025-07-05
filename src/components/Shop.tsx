import { useOutletContext } from "react-router-dom";

function Shop() {
  const [increaseItemCount, decreaseItemCount]: Array<() => void> =
    useOutletContext();
  return (
    <>
      <p>Shop page here</p>
      <button onClick={increaseItemCount}>Increase the counter</button>
      <button onClick={decreaseItemCount}>Decrease the counter</button>
    </>
  );
}

export default Shop;
