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
      }
    },
    [singupInput]
  );

  return (
    <div className="container my-5">
      <form onSubmit={handleFormSubmit}>
        <div className="mp-3">
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
        <div className="mp-3">
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
        <div className="mp-3">
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
        {Boolean(error) && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
