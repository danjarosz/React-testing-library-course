import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("inputs should be initially empty", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

it("should be able to type an email", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  userEvent.type(emailInputElement, "selena@gmail.com");

  expect(emailInputElement.value).toBe("selena@gmail.com");
});

it("should be able to type password", () => {
  render(<App />);

  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "123xyz");

  expect(passwordInputElement.value).toBe("123xyz");
});

it("should be able to type confirmed password", () => {
  render(<App />);

  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "123abc");

  expect(confirmPasswordInputElement.value).toBe("123abc");
});
