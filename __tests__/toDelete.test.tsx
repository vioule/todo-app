import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("is jest works", () => {
  render(<Home />);
  expect(
    screen.getByText(
      "Find in-depth information about Next.js features and API."
    )
  ).toBeInTheDocument();
});
