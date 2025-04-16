import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
        }),
      });
    }
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to your dashboard, {user?.fullName}!</h1>
      <button
        onClick={() => signOut({ redirectUrl: "/" })}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
