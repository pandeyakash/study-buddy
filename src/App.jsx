import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./redux/slice/authSlice";
import { NavBar } from "./components/NavBar/NavBAr";

function App() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  console.log("App User", user)


  return (
    <>  
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
