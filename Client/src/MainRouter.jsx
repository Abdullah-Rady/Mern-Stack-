import { Route, Routes, Navigate, Router } from "react-router-dom";
import AddCourse from "./pages/AddCourse";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Exam from "./components/Exam";
import Admin from "./pages/admin/Admin";
import Useradmin from "./pages/admin/Useradmin";
import ViewRequests from "./pages/admin/ViewRequests";
import Promoadmin from "./pages/admin/Promoadmin";
import Profile from "./pages/Profile";
import { isAuthenticated } from "./apis/auth/auth-helper";
import UserContextLayout from "./utils/UserContextLayout";
import Courses from "./pages/Courses";
import AdminRouter from "./routers/admin.router";
import NotAuthorized from "./pages/NotAuthorized";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import Course from "./pages/Course";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import SidebarInstructor from "./components/instructor/SideBarInstructor";
import AddCourseInstructor from "./pages/instructor/AddCourseInstructor";
import InstructorRouter from "./routers/Instructor.Router";
import ViewCourses from "./pages/instructor/ViewCourses";
import AddPromoInstructor from "./pages/instructor/AddPromoInstructor";
import AddLessonInstructor from "./pages/instructor/AddLessonInstructor";
import AddExamInstructor from "./pages/instructor/AddExamInstructor";
import StudentRouter from "./routers/Student.router";
import MyCourses from "./pages/student/MyCourses";
import MyProblems from "./pages/student/MyProblems";
import Reports from "./pages/admin/Reports";
import InstProblems from "./pages/instructor/InstProblems";
import CourseSideBar from "./components/student/CourseSideBar";

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<UserContextLayout />}>

        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/searchresults" element={<SearchResults />}></Route>

        <Route
          path="/signup"
          element={
            !isAuthenticated() ? <Signup /> : <Navigate to="/" />
          }
        ></Route>

        {/* Admin */}
        <Route path="/admin/" element={ !isAuthenticated() ?<Navigate to="/not-authorized" /> : <AdminRouter />}>
          <Route path=":id" element={<Admin />}></Route>
          <Route path=":id/adduser" element={<Useradmin />}></Route>
          <Route path=":id/addpromo" element={<Promoadmin />}></Route>
          <Route path=":id/requests" element={ <ViewRequests />}></Route>
          <Route path=":id/reports" element={  <Reports />}></Route>
        </Route>

        {/* Instructor */}
        <Route path="/instructor/:id/" element={!isAuthenticated() ? <Navigate to="/not-authorized"  /> : <InstructorRouter />}>
          <Route path="addcourse" element={ <AddCourseInstructor />}></Route>
          <Route path="viewcourses" element={<ViewCourses/>}></Route>
          <Route path="addpromo" element={<AddPromoInstructor />}></Route>
          <Route path="dashboard" element={<SidebarInstructor/>}></Route>
          <Route path="addlesson/:courseid" element={<AddLessonInstructor />}></Route>
          <Route path="addexam/:courseid" element={<AddExamInstructor />}></Route>
          <Route path="problems" element={<InstProblems />}></Route>
        </Route>

        {/* User */}
        <Route path="/user/:id" element={<Profile />}></Route>

        {/* Student */}
        <Route path="/student/:id/" element={!isAuthenticated() ? <Navigate to="/not-authorized"  /> :  <StudentRouter />}>
          <Route path="mycourses" element={<MyCourses />}></Route>
          <Route path="problems" element={<MyProblems />}></Route>
          <Route path="course/:courseid" element={<CourseSideBar />}></Route>
          {/* <Route path="course/:courseid" element={<ViewCourses/>}></Route> */}
        </Route>


        {/* Course */}
        <Route path="/exam" element={<Exam />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/course/:id" element={<Course />}></Route>

        <Route
          path="/signin"
          element={
            !isAuthenticated() ? <Signin /> : <Navigate to="/" />
          }
          
        ></Route>

        <Route path="/not-authorized" element={<NotAuthorized />}></Route>
        <Route path="/passwordReset" element={<ForgotPassword />}></Route>
        <Route
          path="/passwordResetRequest"
          element={<PasswordResetRequest />}
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
