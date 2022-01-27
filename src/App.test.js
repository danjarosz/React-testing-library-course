import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

//  helpers
const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(emailInputElement, email);
  }

  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

// hooks
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App />);
});

afterEach(() => {});

beforeAll(() => {});

afterAll(() => {});

// tests
test("inputs should be initially empty", () => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

it("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({ email: "selena@gmail.com" });
  expect(emailInputElement.value).toBe("selena@gmail.com");
});

it("should be able to type password", () => {
  const { passwordInputElement } = typeIntoForm({ password: "123xyz" });
  expect(passwordInputElement.value).toBe("123xyz");
});

it("should be able to type confirmed password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "123abc",
  });
  expect(confirmPasswordInputElement.value).toBe("123abc");
});

it("should show email error message on invalid email", () => {
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({ email: "selenagmail.com" });
  userEvent.click(submitButtonElement);

  const emailErrorElementAfterClick = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAfterClick).toBeInTheDocument();
});

it("should show password error if it has less than 5 characters", () => {
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({
    password: "1234",
  });
  userEvent.click(submitButtonElement);

  const passwordErrorElementAfterFirstClick = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAfterFirstClick).not.toBeInTheDocument();

  typeIntoForm({ email: "some@validemail.com" });
  userEvent.click(submitButtonElement);

  const passwordErrorElementAfterSecondClick = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  expect(passwordErrorElementAfterSecondClick).toBeInTheDocument();
});

it("should show confirm password error if password and confirmed password are different", () => {
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ email: "some@validemail.com" });
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAfterFirstClick = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  expect(confirmPasswordErrorElementAfterFirstClick).not.toBeInTheDocument();

  typeIntoForm({ password: "1234" });
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAfterSecondClick = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  expect(confirmPasswordErrorElementAfterSecondClick).not.toBeInTheDocument();

  typeIntoForm({ password: "5", confirmPassword: "1234" });
  userEvent.click(submitButtonElement);

  const confirmPasswordErrorElementAfterThirdClick = screen.queryByText(
    /the passwords don't match. Try again/i
  );
  expect(confirmPasswordErrorElementAfterThirdClick).toBeInTheDocument();
});

it("should not display any error message if all inputs are valid", () => {
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });
  typeIntoForm({
    email: "tester@user.com",
    password: "qwerty",
    confirmPassword: "qwerty",
  });
  userEvent.click(submitButtonElement);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. Try again/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
