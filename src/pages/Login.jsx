import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearPayload } from "../state/AuthSlice";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { payload, loading, is_authenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (!loading && payload != null) {
      if (payload.statusCode == 200 || payload.statusCode == 2110) {
        Swal.fire({
          title: "Success",
          text: payload.message,
          icon: "success",
        }).then(() => {
          dispatch(clearPayload());
          navigate("/");
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
      <h2>Login</h2>
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
          Login
        </button>
      </form>
      <Link to="/register">Belum Punya Akun?</Link>
    </div>
  );
};

export default Login;
