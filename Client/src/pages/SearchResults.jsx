import { Link, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import { useState } from "react";
import { searchCourses } from "../apis/courses-api";
import CourseVertical from "../components/ CourseVertical";
import { useEffect } from "react";

const SearchResults = () => {
  const [keyword, setKeyword] = useState("");

  const [subjects, setSubjects] = useState([]);

  const [price, setPrice] = useState(2);

  const [rating, setRating] = useState();

  const [courses, setCourses] = useState();


  const changeRating = (r) => {
    setRating(r);
  };

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const changePrice = (name) => {
    if (name === "free") {
      setPrice(0);
    } else {
      setPrice(1);
    }
  };

  const changeSelubject = (e) => {
    if (subjects.includes(e.target.id)) {
      const val = subjects;
      let j = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === e.target.id) {
          j = i;
        }
      }

      val.splice(j, 1);
      setSubjects(val);
    } else setSubjects((prev) => [...prev, e.target.id]);
  };


  const search = async () => {
    let res;
    try {
      res = await searchCourses({ keyword: keyword });
      console.log(res);
      if (res.status == 200) {
        setCourses(res.data);
      }
      console.log(courses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav changeKeyword={changeKeyword} search={search} />
      <div className="flex flex-row ">
        <Filter
          changeRating={changeRating}
          changePrice={changePrice}
          changeSelubject={changeSelubject}
        />
        <div className="flex flex-col w-8/12">

        {courses &&
            courses.map((course, index) => {
              if (
                (((course.price["$numberDecimal"] != 0 && 
                  price == 1)) || (course.price["$numberDecimal"] == 0 && price == 0)) &&
                (Number.parseFloat(
                  course.rating / course.numberOfRatings
                ).toFixed(2) >= rating &&
                  Number.parseFloat(
                    course.rating / course.numberOfRatings
                  ).toFixed(2) <
                    rating + 0.4) &&
                (subjects.length > 0
                  ? subjects.includes(course.subject)
                  : true)
              ) {
                return (
                  <Link to={`/course/${course._id}`} key={index}>
                    <CourseVertical course={course} />
                  </Link>
                );

              } 

               else if (
                subjects.length > 0 &&
                price == 1 &&
                !rating
              ) {
                for (let i = 0; i < subjects.length; i++) {
                  if (course.subject == subjects[i] && course.price["$numberDecimal"] > 0) {
                    return (
                      <Link to={`/course/${course._id}`} key={index}>
                        <CourseVertical course={course} />
                      </Link>
                    );
                  }
                }

              }

              else if (
                subjects.length > 0 &&
                price == 2 &&
                !rating
              ) {
                for (let i = 0; i < subjects.length; i++) {
                  if (course.subject == subjects[i] ) {
                    return (
                      <Link to={`/course/${course._id}`} key={index}>
                        <CourseVertical course={course} />
                      </Link>
                    );
                  }
                }

              }

              else if (
                subjects.length > 0 &&
                price == 0 &&
                !rating
              ) {
                for (let i = 0; i < subjects.length; i++) {
                  if (course.subject == subjects[i] && course.price["$numberDecimal"] == 0) {
                    return (
                      <Link to={`/course/${course._id}`} key={index}>
                        <CourseVertical course={course} />
                      </Link>
                    );
                  }
                }

              }

              else if (
                price == 0 &&
                !rating &&
                !subjects.length
              ) {
                if (course.price["$numberDecimal"] == 0) {
                  return (
                    <Link to={`/course/${course._id}`} key={index}>
                      <CourseVertical course={course} />
                    </Link>
                  );
                }
              }

              else if (
                price == 1 &&
                !rating &&
                !subjects.length 
             
              ) {
                if (course.price["$numberDecimal"] > 0) {
                  return (
                    <Link to={`/course/${course._id}`} key={index}>
                      <CourseVertical course={course} />
                    </Link>
                  );
                }
              }

              else if (
                price == 2 &&
                !rating &&
                !subjects.length
              ) {
                return (
                  <Link to={`/course/${course._id}`} key={index}>
                    <CourseVertical course={course} />
                  </Link>
                );
              }         
            })}

        </div>
      </div>
    </>
  );
};

export default SearchResults;
