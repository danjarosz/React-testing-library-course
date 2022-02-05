import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card";

const cardProps = {
  id: "1",
  name: "Sidney",
  phone: "111-111-1111",
  email: "laith@hotmail.com",
  image: {
    url: "https://cdn.pixabay.com/photo/2017/07/22/15/21/cat-2528935_960_720.jpg",
    alt: "cute cat",
  },
  favoured: false,
  updateFavourite: () => {}
};

describe("Card component", () => {
  it("should show name of cat", () => {
    render(<Card {...cardProps} />);

    expect(
      screen.getByRole("heading", {
        name: /sidney/i,
      })
    ).toBeInTheDocument();
  });

  it("should show phone number of cat", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  it("should show email of cat", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText(/laith@hotmail.com/i)).toBeInTheDocument();
  });

  it("should show image of cat with correct source", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  it("should show outlined heart", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });

  it("should show filled heart", () => {
    render(<Card {...cardProps} favoured={true} />);

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  it("should toggle heart status", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });
});
