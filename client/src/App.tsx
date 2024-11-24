import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import { useUserStore } from "./Store/UseUserStore";
import { useEffect } from "react";
import { useThemeStore } from "./Store/UseThemeStore";

function App() {
  const { getMe, loading, user } = useUserStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (loading) return null;

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="/setting" element={<Setting />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
