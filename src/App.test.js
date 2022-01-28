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

const clickSubmitButton = () => {
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.click(submitButtonElement);
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
  expect(screen.getByRole("textbox").value).toBe("");
  expect(screen.getByLabelText("Password").value).toBe("");
  expect(screen.getByLabelText(/confirm password/i).value).toBe("");
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
  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).not.toBeInTheDocument();

  typeIntoForm({ email: "selenagmail.com" });
  clickSubmitButton();

  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).toBeInTheDocument();
});

it("should show password error if it has less than 5 characters", () => {
  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).not.toBeInTheDocument();

  typeIntoForm({
    password: "1234",
  });
  clickSubmitButton();

  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).not.toBeInTheDocument();

  typeIntoForm({ email: "some@validemail.com" });
  clickSubmitButton();

  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).toBeInTheDocument();
});

it("should show confirm password error if password and confirmed password are different", () => {
  expect(
    screen.queryByText(/the passwords don't match. Try again/i)
  ).not.toBeInTheDocument();

  typeIntoForm({ email: "some@validemail.com" });
  clickSubmitButton();

  expect(
    screen.queryByText(/the passwords don't match. Try again/i)
  ).not.toBeInTheDocument();

  typeIntoForm({ password: "1234" });
  clickSubmitButton();

  expect(
    screen.queryByText(/the passwords don't match. Try again/i)
  ).not.toBeInTheDocument();

  typeIntoForm({ password: "5", confirmPassword: "1234" });
  clickSubmitButton();

  expect(
    screen.queryByText(/the passwords don't match. Try again/i)
  ).toBeInTheDocument();
});

it("should not display any error message if all inputs are valid", () => {
  typeIntoForm({
    email: "tester@user.com",
    password: "qwerty",
    confirmPassword: "qwerty",
  });
  clickSubmitButton();

  expect(
    screen.queryByText(/the email you input is invalid/i)
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(
      /the password you entered should contain 5 or more characters/i
    )
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(/the passwords don't match. Try again/i)
  ).not.toBeInTheDocument();
});
