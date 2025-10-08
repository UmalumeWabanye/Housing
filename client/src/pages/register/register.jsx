import axios from 'axios';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
    country: '',
    phone: '',
    img: '',
    isAdmin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePhoneChange = (value) => {
    setCredentials((prev) => ({ ...prev, phone: `+${value}` }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/api/auth/register', credentials);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <form className="register-container" onSubmit={handleClick}>
        <h2 className="register-title">Create Your Account</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" onChange={handleChange} required />
        </div>

        <div className="input-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
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
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Enter city" onChange={handleChange} />
        </div>

        <div className="input-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" placeholder="Enter country" onChange={handleChange} />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            country={'za'}
            value={credentials.phone.replace('+', '')}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'phone',
              required: true,
            }}
            enableSearch
            containerClass="phone-input-container"
            inputClass="phone-input-field"
            buttonClass="phone-input-button"
          />
        </div>

        <button type="submit" className="register-button">Register</button>

        {error && <p className="error-message">{error.message}</p>}

        <p className="login-prompt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
