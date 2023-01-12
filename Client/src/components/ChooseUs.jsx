import React, { useState } from "react";

import chooseImg from "../assets/Images/why-choose-us.png";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section>
      <div>
        <div className="flex flex-row justif-between w-8/12 mx-auto mt-4">
          <div>
            <div className="w-2/3">
              <h2 className="text-4xl font-bold mb-12">Why Choose Us</h2>
              <p className="mt-4 text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt mollitia nostrum harum eos praesentium odit a sed quod
                aut fugit. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Reprehenderit omnis, culpa eligendi inventore perspiciatis
                minus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores cupiditate facilis provident quidem accusamus impedit
                tenetur laboriosam debitis nisi eius!
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden w-full h-full">
            <div>
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qFp27TR4Yew"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img
                  src={chooseImg}
                  alt=""
                  className="bg-cover  w-auto h-auto"
                />
              )}

              {!showVideo && (
                <span className="">
                  <i
                    className="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
