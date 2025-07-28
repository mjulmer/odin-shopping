import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  it("Renders nav bar with cart", () => {
    window.fetch = vi.fn(() =>
      Promise.resolve(new Response(new Blob(), { status: 200 }))
    );
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Cart/)).toBeTruthy();
  });
});
