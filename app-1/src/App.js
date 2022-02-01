import { useCallback, useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [singupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { email, password, confirmPassword } = singupInput;
      if (!validator.isEmail(email)) {
        setError("The email you input is invalid.");
      } else if (password.length < 5) {
        setError(
          "The password you entered should contain 5 or more characters."
        );
      } else if (password !== confirmPassword) {
        setError("The passwords don't match. Try again.");
      } else {
        setError("");
      }
    },
    [singupInput]
  );

  return (
    <div className="container my-5">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={singupInput.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={singupInput.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={singupInput.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        {Boolean(error) && (
          <div className="mb-3">
            <p className="text-danger">{error}</p>
          </div>
        )}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
