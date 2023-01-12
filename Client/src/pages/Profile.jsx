import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../assets/Images/user.png";
import Nav from "../components/Nav";
import Rating from "react-simple-star-rating";
import { BsStar } from "react-icons/bs";

import { instructorCourses } from "../apis/courses-api";
import CoursesSlider from "../components/CoursesSlider"
import RatingDynamic from "../components/RatingDynamic";
import {addRating, getInstructor} from "../apis/instructors-api.js";


const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState();
  const [rateSuc, setRateSuc] = useState();
  const [courses, setCourses] = useState();
  const [rating, setRating] = useState(0); // initial rating value

    const [filled, setFilled] = useState(0)
    const [nonFilled, setNonFilled] = useState(5)



    const onHover = (e) => {
        console.log(e)
        setFilled(e)
        setNonFilled(5 - e)
    }


  const handleRating = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    let flag = true
    const fetch = async () => {
      
      try {
          let res;
          let res1;

          let req = await Promise.all([getInstructor(id), instructorCourses(id)])

          if (req[0].status === 200 && flag) {
             setUser(req[0].data)
         }

          if (req[1].status === 200 && flag) {
              setCourses(req[1].data)
          }

      } catch (error) {
        console.log(error);
      }
    }

    fetch();

    return () => { flag = false};
  }, []);

  const submitRating = async (id, rating) => {
      try{
          let res = await addRating(id, {rate: rating})
          setRateSuc("s")

          setTimeout(() => {
              setRateSuc()
          }, 3000)
    }catch (error){
        console.log(error);

    }

  }

  return (
    <>
      <Nav />
      <section className="relative block" style={{ height: "500px" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2258&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={img}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                      {courses && <div className="mr-4 p-3 text-center">
                          <div className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                              <p> {(user.u.rating / user.u.numberOfRatings).toFixed(2)} </p>
                          </div>
                          <span className="text-sm text-gray-500">Rating</span>
                  </div>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      {courses && <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          { courses.length}
                      </span>
                      <span className="text-sm text-gray-500">Courses</span>
                    </div>}
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                  Abdullah Rady
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                  Instructor
                </div>
                <div className="mb-2 text-gray-700 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                  Instructor - Advance Excel, Excel Vba ,Access, Access Vba
                </div>
                <div className="mb-2 text-gray-700">
                  <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                  University of Computer Science
                </div>
                  <div className="flex flex-col items-center mt-6 px-6 py-2 rounded-md">

                      <h1 className="font-bold text-2xl mb-4">Rate Instructor</h1>
                      <div className="text-2xl"><RatingDynamic filled={filled} setFilled={setFilled} nonFilled={nonFilled} setNonFilled={setNonFilled} onHover={onHover}/> </div>
                      <button className={ rateSuc ? "mt-4  text-white px-4 py-2 rounded-md bg-green-500" :  "mt-4  text-white px-4 py-2 rounded-md bg-pink-500" } onClick={() => submitRating(id, filled)}>Submit</button>
                  </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      I have been teaching online from 10 years now and teaching
                      is my hobby and passion. I cannot think of anything better
                      than teaching and shaping up students career. Enroll today
                      and take your knowledge to the next level. My training
                      content is my proud and you will not be disappointed. I
                      teach advance Excel, Excel VBA, MS Access, Access VBA,
                      PowerQuery, M code in Powerquery, PowerPivot,DAX
                      Formulas,Power BI and WebScraping using html libraries in
                      VBA.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12 ml-52">
                <CoursesSlider courses={courses}/>
              </div>

              <div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
