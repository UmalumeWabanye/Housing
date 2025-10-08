import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      // navigate("/") will be triggered by useEffect when user is set
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.details });
    }
  };

  return (
    <div className="login">
      <form className="login-container" onSubmit={handleClick}>
        <h2 className="login-title">Welcome Back</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error-message">{error.message}</p>}

        <p className="signup-prompt">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
