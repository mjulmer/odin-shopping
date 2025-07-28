import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";
import type { ShoppingItem } from "../src/ShoppingItem";
import ShoppingItems from "../src/components/ShoppingItems";

let cartItemCount: number = 0;
let setItemCount = vi.fn();
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
  increaseItemCount: (valueToAdd: number) => {
    setItemCount(cartItemCount + valueToAdd);
    // Simulates getting item count update from data layer
    cartItemCount = cartItemCount + valueToAdd;
  },
};

afterEach(() => {
  cartItemCount = 0;
  // Reset the mock so that we don't get a false positive if previous tests
  // called it with the same argument.
  setItemCount = vi.fn();
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

  it("correctly adds items to cart", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    await user.type(
      screen.getByRole("textbox", {
        name: /Linen Tunic/,
      }),
      "2"
    );
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Linen Tunic/,
      })
    );

    expect(setItemCount).toHaveBeenCalledWith(2);
  });

  it("Item input quantity 0 after adding to cart", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    const tunicInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /Linen Tunic/,
    });
    await user.type(tunicInput, "2");
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Linen Tunic/,
      })
    );

    expect(tunicInput.value).toBe("0");
  });

  it("Changing quantity of item with buttons works", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    const incrementButton = screen.getByRole("button", {
      name: /Increase.*Linen Tunic/,
    });
    const decrementButton = screen.getByRole("button", {
      name: /Decrease.*Linen Tunic/,
    });
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(decrementButton);
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Linen Tunic/,
      })
    );

    expect(setItemCount).toHaveBeenCalledWith(3);
  });

  it("Decrementing below zero with buttons does nothing", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    const incrementButton = screen.getByRole("button", {
      name: /Increase.*Linen Tunic/,
    });
    const decrementButton = screen.getByRole("button", {
      name: /Decrease.*Linen Tunic/,
    });
    const tunicInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /Linen Tunic/,
    });
    await user.click(incrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Linen Tunic/,
      })
    );

    expect(tunicInput.value).toBe("0");
    expect(setItemCount).toHaveBeenCalledWith(0);
  });

  it("Changing quantity input of two items and pressing add to cart on only one adds only that quantity", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    await user.type(
      screen.getByRole("textbox", {
        name: /Linen Tunic/,
      }),
      "2"
    );
    await user.type(
      screen.getByRole("textbox", {
        name: /Embersilk bag/,
      }),
      "8"
    );
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Linen Tunic/,
      })
    );

    expect(setItemCount).toHaveBeenCalledWith(2);
  });

  it("Changing quantity input of two items and pressing add to cart consecutively adds correct number", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    await user.type(
      screen.getByRole("textbox", {
        name: /Linen Tunic/,
      }),
      "2"
    );
    await user.type(
      screen.getByRole("textbox", {
        name: /Embersilk bag/,
      }),
      "8"
    );
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Linen Tunic/,
      })
    );
    await user.click(
      screen.getByRole("button", {
        name: /Add.*Embersilk bag/,
      })
    );

    expect(setItemCount).toHaveBeenCalledWith(10);
  });

  it("Only integers are accepted in input", async () => {
    const user = userEvent.setup();
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    const tunicQuantityInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /Linen Tunic/,
    });
    await user.type(tunicQuantityInput, "2");
    await user.type(tunicQuantityInput, "K");

    expect(tunicQuantityInput.value).toBe("2");
  });

  it("Item quantities initialized to 0 when items change", async () => {
    const mockOutletContextWithOneItem: {
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
      ],
      increaseItemCount: (valueToAdd: number) => {
        setItemCount(cartItemCount + valueToAdd);
        // Simulates getting item count update from data layer
        cartItemCount = cartItemCount + valueToAdd;
      },
    };

    render(
      <RenderRouteWithOutletContext context={mockOutletContextWithOneItem}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <ShoppingItems />
      </RenderRouteWithOutletContext>
    );

    const tunicQuantityInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /Linen Tunic/,
    });
    expect(tunicQuantityInput.value).toBe("0");
  });
});
