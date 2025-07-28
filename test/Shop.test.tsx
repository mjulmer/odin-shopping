import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";
import type { ShoppingItem } from "../src/ShoppingItem";
import Shop from "../src/components/Shop";

interface mockOutletContextDataType {
  shoppingItems: Array<ShoppingItem>;
  didDataFetchFail: boolean;
}

describe("Shop component", () => {
  it("Shop component renders error when fetch failed", () => {
    const mockOutletContextData: mockOutletContextDataType = {
      shoppingItems: [],
      didDataFetchFail: true,
    };
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <Shop />
      </RenderRouteWithOutletContext>
    );

    expect(screen.getByText(/An error occured/)).toBeTruthy();
  });

  it("Shop component renders loading when no items", () => {
    const mockOutletContextData: mockOutletContextDataType = {
      shoppingItems: [],
      didDataFetchFail: false,
    };
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <Shop />
      </RenderRouteWithOutletContext>
    );

    expect(screen.getByText(/Loading/)).toBeTruthy();
  });

  it("Shop component renders items when it receives items", () => {
    const mockOutletContextData: mockOutletContextDataType = {
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
      didDataFetchFail: false,
    };
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <Shop />
      </RenderRouteWithOutletContext>
    );

    expect(screen.getByText(/Linen Tunic/)).toBeTruthy();
  });
});
