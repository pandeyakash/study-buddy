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
import { Calendar } from "./pages/Calendar";
import { Tasks } from "./pages/Tasks";
import { Pomodoro } from "./pages/Pomodoro";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

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
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/pomodoro" element={<ProtectedRoute><Pomodoro /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
