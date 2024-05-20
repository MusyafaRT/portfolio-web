import App from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    render(<div>testing</div>);

    const heading = screen.getByText(/testing/i);

    expect(heading).toBeInTheDocument();
  });
});
