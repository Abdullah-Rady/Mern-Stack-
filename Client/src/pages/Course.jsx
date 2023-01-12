import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { getCourse, addRating } from "../apis/courses-api";
import Rating from "../components/Rating";
import RatingDynamic from "../components/RatingDynamic";
import { isAuthenticated } from "../apis/auth/auth-helper";
import { CurrentUserContext } from "../hooks/CurrentUserContext";
import BuyCourse from "../components/BuyCourse";
import { requestAccess } from "../apis/corporate-api";
import {FiPlay} from "react-icons/fi"
import useLocalStorageStore from "../hooks/useLocalStorage";

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [rateSuc, setRateSuc] = useState();
  const [enrollc, setenroll] = useState();
  const [req, setReq] = useState();
  const [play, setPlay] = useState(false);
  const [user] = useContext(CurrentUserContext);
  const local = useLocalStorageStore()

  let navigate = useNavigate();

  const [filled, setFilled] = useState(0);
  const [nonFilled, setNonFilled] = useState(5);

  const onHover = (e) => {
    console.log(e);
    setFilled(e);
    setNonFilled(5 - e);
  };

  useEffect(() => {
    let flag = true;
    const fetch = async (id) => {
      let res;
      try {
        res = await getCourse(id);
        if (res.status == 200 && flag) {
          setCourse(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch(id);

    return () => {
      flag = false;
    };
  }, []);

  const submitRating = async (id, rating) => {
    try {
      let res = await addRating(id, { rate: rating });

      if (res.status == 200) {
        setRateSuc("s");

        setTimeout(() => {
          setRateSuc();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const request = async () => {
    try {
      let re = await requestAccess({ userid: user._id, courseid: id });

      if (re.status == 200) {
        setReq(true);

        setTimeout(() => {
          setReq(false);
        }, 3000);
      }

      alert(re.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  // getCourse
  return (
    <div>
      <Nav />
      {course && (
        <div className="flex flex-col w-full items-center">
          <div className="w-8/12">
            <div className="  flex flex-col items-center w-full px-2 py-3  group transition duration-200 ease-in-out rounded-xl mb-4">
              <div className="mr-2 w-[70%] h-full border-2 rounded-lg overflow-clip relative">
                {!play ? (
                    <>
                    <img src={course.img} className="object-contain cursor-pointer" onClick={() => setPlay(true)} width={1000} height={600}/>
                    <FiPlay className="absolute top-[50%] right-[50%] text-white text-4xl translate-x-[50%] -translate-y-[50%] cursor-pointer"/>
                    </>
                ) : (
                  <iframe
                    width={1000}
                    height={600}
                    src={course.preview ? course.preview : "https://www.youtube.com/embed/hPr-Yc92qaY" }
                  ></iframe>
                )}
              </div>

              <div className="mt-8">
                <h1 className="font-bold mb-2">{course.title}</h1>
                <p className="text-sm text-light mb-2 pr-2">
                  {course.description}
                </p>
                <p className="text-sm text-gray-500 font-light text-[12px] mb-1 hover:underline hover:text-blue-600">
                  <Link to={`/user/${course.instructor._id}`}>
                    {course.author}
                  </Link>
                </p>

                <Rating
                  data={{
                    rating: (course.rating / course.numberOfRatings).toFixed(2),
                    number: parseFloat(course.numberOfRatings),
                  }}
                />
                <p className="text-sm text-gray-500 font-light text-[12px] mt-1">
                  {course.hours} hours
                </p>
                <div className=" mt-6 ">
                  <h1 className="font-bold">
                    {`${parseFloat(course.price["$numberDecimal"] * local.get('exchangeRate')).toFixed(2)} ${local.get('C')}`}
                  </h1>
                </div>
              </div>

              {user && user.role === "Trainee" ? (
                <button
                  className="ml-auto border px-5 py-2 rounded-md hover:bg-gray-200"
                  onClick={() => setenroll(true)}
                >
                  Enroll
                </button>
              ) : user && user.role === "Corporate Trainee" ? (
                <button
                  className={
                    req
                      ? "ml-auto border px-5 py-2 rounded-md hover:bg-gray-200"
                      : "ml-auto border px-5 py-2 rounded-md hover:bg-gray-200 bg-gren-500"
                  }
                  onClick={request}
                >
                  Request access
                </button>
              ) : (
                <div></div>
              )}
              {enrollc && (
                <BuyCourse open={enrollc} onClose={() => setenroll(false)} />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center border px-6 py-2 rounded-md">
            <h1 className="font-bold text-2xl mb-4">Rate Course</h1>
            <div className="text-2xl">
              <RatingDynamic
                filled={filled}
                setFilled={setFilled}
                nonFilled={nonFilled}
                setNonFilled={setNonFilled}
                onHover={onHover}
              />{" "}
            </div>
            <button
              className={
                rateSuc
                  ? "mt-4  text-white px-4 py-2 rounded-md bg-green-500"
                  : "mt-4  text-white px-4 py-2 rounded-md bg-blue-500"
              }
              onClick={() => submitRating(id, filled)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
