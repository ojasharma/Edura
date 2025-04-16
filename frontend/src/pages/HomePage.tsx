import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <SignedIn>
        <h1>Welcome back!</h1>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </SignedIn>

      <SignedOut>
        <h1>Welcome to the App</h1>
        <button onClick={() => navigate("/sign-in")}>Sign In</button>
        <button
          onClick={() => navigate("/sign-up")}
          style={{ marginLeft: "1rem" }}
        >
          Sign Up
        </button>
      </SignedOut>
    </div>
  );
};

export default HomePage;
