import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleLogin } from "../../API/authentication/authUtil";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rememberMe, setRememberMe] = useState<Boolean>(true);

  const onSubmitLogin = (data: any) => {
    var form_data = new FormData();
    form_data.append("username", data.username);
    form_data.append("password", data.password);
    handleLogin(form_data);
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
            Log In To Your Account
          </h1>
          <form className="mt-6" onSubmit={handleSubmit(onSubmitLogin)} action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address Or Username</label>
              <input
                id="username"
                placeholder="Enter Email Address Or Username"
                className="w-full text-gray-900 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && <p className="text-red-500">Username is required</p>}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full text-gray-900 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-8">
            <span className="text-gray-900">Need an account?{" | "}</span>
            <a href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
