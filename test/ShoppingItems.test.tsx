import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";
import type { ShoppingItem } from "../src/ShoppingItem";
import ShoppingItems from "../src/components/ShoppingItems";

let itemCount: number = 0;
const setItemCount = vi.fn();
const mockOutletContextData: {
  shoppingItems: Array<ShoppingItem>;
  increaseItemCount: (number) => void;
} = {
  shoppingItems: [
    {
      id: "0",
      title: "Embersilk bag",
      description: "",
      category: "",
      image: "",
      price: 3,
    },
    {
      id: "1",
      title: "Linen Tunic",
      description: "",
      category: "",
      image: "",
      price: 0.5,
    },
  ],
  increaseItemCount: (valueToAdd: number) =>
    setItemCount(itemCount + valueToAdd),
};

afterEach(() => {
  itemCount = 0;
});

describe("ShoppingItems component", () => {
  it("renders item", () => {
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );
    expect(screen.getByText("Linen Tunic")).toBeTruthy();
  });
});
