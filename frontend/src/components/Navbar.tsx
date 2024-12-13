import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "../styles/NavbarStyles";
import { logo } from "../assets/index";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(true);

  const toggleMenu = () => {
    // if (isMenuOpen) {
    setIsMenuOpen(!isMenuOpen);
    // }
  };

  const handleActionButtonClick = (page: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    if (isSignedIn) {
      navigate("/dashboard/analysis");
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          {isLogoLoaded ? (
            <img
              src={logo}
              alt="Beauty"
              onError={() => setIsLogoLoaded(false)}
              className="w-16 h-16 md:w-20 md:h-16"
            />
          ) : (
            "Beauty"
          )}
        </Link>

        <div className="flex md:hidden gap-3  pr-4 ">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button onClick={toggleMenu} className={styles.toggleButton}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.openMenu : styles.closedMenu
          }`}
        >
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/dashboard/analysis" className={styles.link}>
              Dashboard
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/pricing" className={styles.link}>
              Pricing
            </Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/about" className={styles.link}>
              About
            </Link>
          </li>
          <li className="block md:hidden">
            <SignedOut>
              <button
                className={styles.getStartedButton}
                onClick={() => handleActionButtonClick("signup")}
              >
                Get Started
              </button>
            </SignedOut>
          </li>
          <li className="block md:hidden">
            <SignedOut>
              <button
                className={styles.loginButton}
                onClick={() => handleActionButtonClick("login")}
              >
                Login
              </button>
            </SignedOut>
          </li>
        </ul>

        <div className={styles.actionButtons}>
          <SignedOut>
            <button
              className={styles.getStartedButton}
              onClick={() => handleActionButtonClick("signup")}
            >
              Get Started
            </button>
            <button
              className={styles.loginButton}
              onClick={() => handleActionButtonClick("login")}
            >
              Login
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
