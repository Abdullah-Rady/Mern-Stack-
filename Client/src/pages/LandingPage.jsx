import { useEffect } from "react";
import ChooseUs from "../components/ChooseUs";
import CoursesSlider from "../components/CoursesSlider";
import Nav from "../components/Nav";
import Newsletter from "../components/NewsLetter";
import Accordion from "../components/Accordion";
import Hero from "../components/Hero";
import { useContext } from "react";
import { CurrentUserContext } from "../hooks/CurrentUserContext";

const LandingPage = () => {
  const UserProvider = useContext(CurrentUserContext);

  console.log(UserProvider);

  return (
    <>
      <Nav />
      <Hero />

      <Newsletter />
      <ChooseUs />
    </>
  );
};

export default LandingPage;
