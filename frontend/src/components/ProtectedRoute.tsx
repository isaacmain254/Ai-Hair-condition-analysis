import React from "react";
import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();

  // Wait for Clerk to initialize before checking `isSignedIn`
  if (isSignedIn === undefined) {
    return null; // Render nothing or a loading spinner while state resolves
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
