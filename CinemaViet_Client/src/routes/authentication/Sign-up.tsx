import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleRegister } from "../../API/authentication/authUtil";
import { VALIDATIONEMAIL } from "../../AppContains";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationEmail = {
    ...register("email", {
      required: true,
      pattern: VALIDATIONEMAIL,
    }),
  };

  const onSubmitSignUp = (data: any) => {
    handleRegister(data);
    console.log(data);
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://i.pinimg.com/564x/ef/cd/1c/efcd1c222b42d04cc6f6f46a83c0a2d4.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-gray-900">
            Please Register An Account
          </h1>
          <form className="mt-6" onSubmit={handleSubmit(onSubmitSignUp)} action="#" method="POST">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                id="username"
                placeholder="Enter Username"
                className="w-full text-gray-900 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                {...register("username", { required: true })}
              />
              {errors.username && <p className="text-red-500">Username is required</p>}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                {...validationEmail}
                className="w-full text-gray-900 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              />
              {errors.email && <p className="text-red-500">Email is required</p>}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
                className="w-full text-gray-900 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              Sign up
            </button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            <span className="text-gray-900">Already have an account?</span>
            <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
