import {
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { FC } from "react";

const App: FC = () => {
  const { isSignedIn } = useUser();

  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />

      {/* Auth Routes */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={isSignedIn ? <Dashboard /> : <Navigate to="/" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<RedirectToSignIn />} />
    </Routes>
  );
};

export default App;
