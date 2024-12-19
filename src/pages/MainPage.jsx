// import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../state/AuthSlice";

const MainPage = () => {
  const { is_authenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispact = useDispatch();

  useEffect(() => {
    if (!is_authenticated) {
      navigate("/login");
    }
  }, [is_authenticated, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispact(logout());
  };
  return (
    <div>
      <h1>MAIN PAGE</h1>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};

export default MainPage;
