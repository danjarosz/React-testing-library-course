import { screen, render } from "@testing-library/react";
import Cards from "../Cards";
import cats from "../../../mocks/cats.json";

describe("Cards", () => {
  it("should render five card components", () => {
    render(<Cards cats={cats} setCats={() => {}}/>);
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
