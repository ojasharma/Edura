import { useUser, useClerk } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hi 👋</h1>
      <p>
        <strong>Name:</strong> {user?.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}
      </p>

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
