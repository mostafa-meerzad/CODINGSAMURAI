import { useState } from "react";
import AuthForm from "../AuthForm";

const Header = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const openAuthForm = () => {
    setShowAuthForm(true);
  };
  const closeAuthForm = () => {
    setShowAuthForm(false);
  };
  return (
    <header className=" flex items-center justify-between w-full ">
      <h1 className="text-5xl font-semibold uppercase tracking-wider">todo</h1>{" "}
      <button onClick={openAuthForm} className="text-lg font-semibold">
        Sign Up
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
