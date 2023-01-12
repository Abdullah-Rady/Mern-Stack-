import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import { GrTechnology } from "react-icons/gr";
import { CurrentUserContext } from "../hooks/CurrentUserContext";
import { signin } from "../apis/auth/auth-api";
import { authenticate } from "../apis/auth/auth-helper";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [user1, setUser1] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setrememberMe] = useState(false);

  const handleChange = (e) => {
    setUser1((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRememberMeClick = () => {
    setrememberMe((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      const response = await signin(user1);

      // if (res.status == 200) {

      authenticate(response.data.token, () => {}, rememberMe);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      // } else {
      //   throw new Error("Authentication failed");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <GrTechnology className="mx-auto h-12 w-auto" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-black-500 accent-gray-600"
                  onClick={handleRememberMeClick}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600 hover:text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/passwordResetRequest"
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-900 hover:text-black-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                onClick={handleSubmit}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-black-500 group-hover:text-black-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
