// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import Tailwind CSS
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

// Replace with your actual Clerk publishable key
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerkPubKey = clerkPublishableKey;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        {" "}
        {/* Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
