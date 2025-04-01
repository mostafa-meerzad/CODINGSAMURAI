import { useState } from "react";
import AuthForm from "../AuthForm";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const openAuthForm = () => {
    setShowAuthForm(true);
  };
  const closeAuthForm = () => {
    setShowAuthForm(false);
  };

  return (
    <header className=" flex items-center justify-between w-full ">
      <h1 className="text-5xl font-semibold uppercase tracking-wider">todo</h1>{" "}
      <button
        onClick={isAuthenticated ? logout : openAuthForm}
        className="text-lg font-semibold capitalize"
      >
        {isAuthenticated ? "Log out" : "Sign up"}
      </button>
      {showAuthForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-very-dark-desaturated-blue/60 z-20">
          <AuthForm closeForm={closeAuthForm} />
        </div>
      )}
    </header>
  );
};

export default Header;
