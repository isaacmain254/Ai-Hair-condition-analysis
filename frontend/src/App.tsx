import React from "react";
import { SignUp, SignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoPage from "./pages/PhotoPage/PhotoPage";
import AnalysisPage from "./pages/AnalysisPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import StripeSuccessPage from "./pages/StripeSuccessPage";

// Using Vite environment variables for Clerk API key
// const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex w-full">
          <Routes>
            {/* Home page */}
            <Route index element={<Home />} />

            {/* Login */}
            <Route
              path="/login"
              element={
                <div className="flex w-full items-center justify-center h-screen">
                  <SignIn />
                </div>
              }
            />
            {/* Signup route */}
            <Route
              path="/signup"
              element={
                <div className="flex w-full items-center justify-center h-screen">
                  <SignUp />
                </div>
              }
            />

            {/* Dashboard and nested routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="photo" element={<PhotoPage />} />
            </Route>

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/success" element={<StripeSuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
