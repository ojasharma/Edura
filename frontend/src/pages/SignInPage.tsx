import { SignIn } from "@clerk/clerk-react";

const SignInPage: React.FC = () => (
  <SignIn
    appearance={{ variables: { colorPrimary: "#000" } }}
    forceRedirectUrl="/dashboard" // Forces redirect to dashboard after sign-in
    fallbackRedirectUrl="/dashboard" // Fallback redirect if no redirect URL is provided
  />
);

export default SignInPage;
