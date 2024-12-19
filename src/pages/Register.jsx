import { useEffect, useState } from "react";
import "../assets/styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { register, clearPayload } from "../state/AuthSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { payload, loading, is_authenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register({ username, email, password }));
  };

  useEffect(() => {
    if (!loading && payload != null) {
      if (payload.statusCode == 200 || payload.statusCode == 2000) {
        Swal.fire({
          title: "Success",
          text: payload.message,
          icon: "success",
        }).then(() => {
          dispatch(clearPayload());
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: payload.errorMessage,
          icon: "error",
        });
      }
    }

    if (is_authenticated) {
      navigate("/");
    }
  }, [payload, loading, navigate, dispatch, is_authenticated]);

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-passowrd"
          />
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
      <Link to="/login">Punya Akun?</Link>
    </div>
  );
};

export default Register;
