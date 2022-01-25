import "./App.css";

function App() {
  return (
    <div className="container my-5">
      <form>
        <div className="mp-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
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
          />
        </div>
        <div className="mp-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
