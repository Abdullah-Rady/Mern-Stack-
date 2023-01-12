import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {

  const navigate  = useNavigate()
 
  useEffect(() => {
      const c = setTimeout(() => navigate('/') ,2000)
  
    return () => {
      clearTimeout(c)
    }
    
  }, [])
  
  
  return <>
  <p>NotAuthorized</p>
  <br />
  <p>redirecting to home page</p>
  </>;
};

export default NotAuthorized;
