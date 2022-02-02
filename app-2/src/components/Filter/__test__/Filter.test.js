import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

describe("Filter", () => {
  it("should be able to change value of favourite select", () => {
    render(<Filter />);
    const select = screen.getByLabelText(/favourite/i);
    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "favourite");
    expect(select.value).toBe("favourite");
    userEvent.selectOptions(select, "not favourite");
    expect(select.value).toBe("not favourite");
  });

  it("should be able to change value of gender select", () => {
    render(<Filter />);
    const select = screen.getByLabelText(/gender/i);
    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");
    userEvent.selectOptions(select, "female");
    expect(select.value).toBe("female");
  });
});
