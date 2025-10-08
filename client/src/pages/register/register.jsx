import axios from 'axios';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" onChange={handleChange} required />
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
          <input type="text" id="phone" placeholder="Enter phone number" onChange={handleChange} />
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
