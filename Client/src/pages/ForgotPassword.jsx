import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { resetPassword } from "../apis/auth/auth-services-api";
import Modal from "../components/Modal";

const ForgotPassword = () => {
  const navigate = useNavigate();
  let query = useQuery();
  console.log(query);

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await resetPassword({
        token: query.get("token"),
        id: query.get("id"),
        password: password,
      });

      if (response.status == 200) {
        setOpen(true);

        setTimeout(() => {
          navigate("/signin");
        }, 4000);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <GrTechnology className="mx-auto h-12 w-auto" />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>
        <input type="hidden" name="remember" defaultValue="true" />

        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="password" className="sr-only">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black-500 sm:text-sm"
              placeholder="New password"
              onChange={handleChange}
            />
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
            Reset Password
          </button>
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          close={() => setOpen(false)}
          children={
            <div className="mt-5">Password is changed successfully </div>
          }
        />
      )}
    </div>
  );
};

export default ForgotPassword;
