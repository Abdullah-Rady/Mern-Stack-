import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import axios from "axios";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";

const getLocation = async (store) => {
  if (store.get("country_name")) return;

  try {
    let res = await axios.get("https://geolocation-db.com/json/");

    console.log(res.data);
    store.set("country_name", res.data.country_name);
    store.set("country_code", res.data.country_code);
  } catch (error) {
    console.log(error);
  }
};

const getCurrency = () => {};

function App() {

  const local = useLocalStorage();

  useEffect(() => {
    getLocation(local);
    
    return () => {};
  }, []);
  //  bTSoOekCeeyGgvBRycSoNkLN5POyRSlW

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
