import { screen, render } from "@testing-library/react";
import Cards from "../Cards";
import cats from "../../../mocks/cats.json";
import {PetsContext} from "../../Pets/Pets";

describe("Cards", () => {
  it("should render five card components", () => {
    render(<PetsContext.Provider value={{
      cats,
      setCats: () => {}
    }}><Cards/></PetsContext.Provider>);
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
