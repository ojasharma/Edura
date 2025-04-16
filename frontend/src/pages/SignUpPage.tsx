import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => (
  <SignUp
    appearance={{ variables: { colorPrimary: "#000" } }}
    forceRedirectUrl="/dashboard" // Forces redirect to dashboard after sign-up
    fallbackRedirectUrl="/dashboard" // Fallback redirect if no redirect URL is provided
  />
);

export default SignUpPage;
