import { useOutletContext } from "react-router-dom";

function Shop() {
  const [increaseItemCount, decreaseItemCount]: Array<() => void> =
    useOutletContext();
  return (
    <>
      <h1>This is the shop page </h1>
      <button onClick={increaseItemCount}>Increase the counter</button>
      <button onClick={decreaseItemCount}>Decrease the counter</button>
    </>
  );
}

export default Shop;
