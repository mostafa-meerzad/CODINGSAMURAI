import React, { useState } from "react";
import { useForm } from "react-hook-form";
import cross from "../assets/icon-cross.svg";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Input = ({ label, error, ...props }) => (
  <div className="w-full">
    <input
      className={`w-full h-min bg-very-dark-grayish-blue rounded-md p-2 ${
        error && "outline-red-400 border-red-400 border-2 "
      }`}
      placeholder={label}
      {...props}
    />
    {error && <p className="text-red-400 mt-1 -mb-2">{error}</p>}
  </div>
);

const AuthForm = ({ closeForm }) => {
  const { isAuthenticated, signup, login } = useAuth();
  const [isRegister, setIsRegister] = useState(isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      isRegister ? signup(data) : login(data);
      reset();
      closeForm();
    } catch (error) {
      console.log(error.response.data.error);
      toast.error("couldn't signup");
    }
  };

  return (
    <div className="absolute w-lg  flex flex-col items-stretch justify-between gap-8 bg-very-dark-desaturated-blue rounded-md p-8">
      <div className="flex justify-center items-center relative">
        <h2 className="text-center capitalize text-xl">
          {isRegister ? "sign up" : "login"}
        </h2>
        <button onClick={closeForm} className="absolute right-0">
          <img src={cross} alt="close form" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isRegister && (
          <Input
            label={"name"}
            error={errors.name?.message}
            {...register("name", { required: "Name is required!" })}
          />
        )}
        <Input
          label={"email"}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        <Input
          label={"password"}
          error={errors.password?.message}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters",
            },
          })}
        />

        <button
          type="submit"
          className="text-center p-3 bg-dark-grayish-blue rounded-md w-full"
        >
          Submit
        </button>
      </form>

      <p
        className="text-white cursor-pointer mt-4 text-center"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default AuthForm;
