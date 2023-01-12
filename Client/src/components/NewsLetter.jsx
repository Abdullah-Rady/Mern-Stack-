import axios from "axios";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(() => e.target.value);
  };

  // const addToNewsletter = () => {
  //   axios.request({
  //     method: "POST",
  //     url: "http://localhost:8000/api/newsletter/add",

  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + credentials.t,
  //     },

  //     data: JSON.stringify({ email: email }),
  //   });
  // };

  return (
    <section>
      <div className="newsletter bg-blue-500 p-8 rounded-xl w-8/12 mx-auto mt-16 mb-16">
        <div>
          <div lg="12" className="text-center">
            <h2 className="text-white mb-4 text-2xl">
              Subscribe Our Newsletter
            </h2>
            <div className="w-2/3 px-1 py-2 bg-white mx-auto rounded-full flex align-center justify-between">
              <input
                type="text"
                placeholder="Email"
                className="outline-none border-none p-2 w-2/3 ml-2"
                onChange={handleChange}
              />
              <button
                className="rounded-full bg-blue-500 px-3 py-1 mr-2 text-white hover:bg-blue-600"
                // onClick={addToNewsletter}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
