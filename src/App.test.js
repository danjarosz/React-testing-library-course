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

it("should show email error message on invalid email", () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "selenagmail.com");
  userEvent.click(submitButtonElement);

  const emailErrorElementAfterClick = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAfterClick).toBeInTheDocument();
});

it("should show password error if it has less than 5 characters", () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "1234");
  userEvent.click(submitButtonElement);

  const passwordErrorElementAfterFirstClick = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAfterFirstClick).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "some@validemail.com");
  userEvent.click(submitButtonElement);

  const passwordErrorElementAfterSecondClick = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAfterSecondClick).toBeInTheDocument();
});

it("should show confirm password error if password and confirmed password are different", () => {
  render(<App />);

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "some@validemail.com");
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAfterFirstClick = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  expect(confirmPasswordErrorElementAfterFirstClick).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "1234");
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAfterSecondClick = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  expect(confirmPasswordErrorElementAfterSecondClick).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "5");
  userEvent.type(confirmPasswordInputElement, "1234");
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAfterThirdClick = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  expect(confirmPasswordErrorElementAfterThirdClick).toBeInTheDocument();
});
