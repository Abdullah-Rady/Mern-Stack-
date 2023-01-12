import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Rating from "./Rating";
import { useState } from "react";

const Filter = ({ changeRating, changePrice, changeSelubject }) => {
  const [loading, setLoading] = useState(false);

  const [selSubjects] = useState([
    "Computer Science",
    "Mathematics",
    "Data Science",
    "Web Development"
  ]);

  return (
    <div className="w-2/12 ">
      <>
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-black border-b-2 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 hover:bg-gray-200">
                <span>Price</span>
                <ChevronUpIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                  <div className="flex justify-center">
                    <div className="hover:text-black flex justify-center">
                      <input
                        type="radio"
                        name="price"
                        id="free"
                        className="mr-2"
                        onChange={() => changePrice("free")}
                      />
                      <label htmlFor="free" className="mr-6">
                        Free
                      </label>
                    </div>
                    <div className="hover:text-black">
                      <input
                        type="radio"
                        name="price"
                        className="mr-2"
                        id="paid"
                        onChange={() => changePrice("paid")}
                      />
                      <label htmlFor="paid" className="mr-1">
                        Paid
                      </label>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </>
      <>
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white border-b-2 px-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 hover:bg-gray-200">
                <span>Ratings</span>
                <ChevronUpIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-200 ease-in-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0 "
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 overflow-hidden">
                  <div className="flex flex-col">
                    {[5, 4.49, 4, 3.49, 3, 2.49, 2, 1.49, 1].map((val, index) => {
                      return (
                        <div
                          className="mb-2 flex flex-row align-center"
                          key={index}
                        >
                          <input
                            type="radio"
                            name="rate"
                            className="mr-2"
                            id={val}
                            onClick={() => changeRating(val)}
                          />
                          <label htmlFor={val}>
                            <Rating data={{ rating: val }} />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </>
      <>
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-black border-b-2 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 hover:bg-gray-200">
                <span>Subject</span>
                <ChevronUpIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                  <div className="flex flex-col">
                    {loading && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    {!loading &&
                      selSubjects.map((item, i) => {
                        return (
                          <div className=" hover:text-black mb-2" key={i}>
                            <input
                              type="checkbox"
                              name="subject"
                              className="mr-2"
                              id={`${item}`}
                              onClick={changeSelubject}
                            />
                            <label htmlFor={`${item}`} className="mr-1">
                              {`${item}`}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </>
    </div>
  );
};

export default Filter;
