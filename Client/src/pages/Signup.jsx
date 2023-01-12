import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

import { createUser } from "../apis/individual-api";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createUser(user);

      if (response.status == 200) {
        navigate("/signin");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <GrTechnology className="mx-auto h-12 w-auto" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign Up and start learning
            </h2>
          </div>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="firstname" className="sr-only">
                First Name
              </label>
              <input
                id="firstname"
                name="first_name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
                placeholder="First name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastname" className="sr-only">
                Last Name
              </label>
              <input
                id="lastname"
                name="last_name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
                placeholder="Last name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
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
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
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
            <div className="flex flex-row gap-4 items-center p-4">
              <p>Gender:</p>
              <div className="flex flex-col">
                <label htmlFor="male" className="">
                  Male
                </label>
                <input id="male" name="gender" type="radio" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="female" className="">
                  Female
                </label>

                <input id="female" name="gender" type="radio" />
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-4">
              By signing up, you agree to the
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark"
                to="/terms"
              >
                {" " + "Terms of Service" + " "}
              </Link>
              {"and" + " "}
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark"
                to="/privacy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-300 ease-in-out"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-black-500 group-hover:text-black-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

{
  /*
This example requires updating your template:

```
<html class="h-full bg-gray-50">
<body class="h-full">
```
*/
}
