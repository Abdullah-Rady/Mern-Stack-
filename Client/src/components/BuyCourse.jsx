import { createPortal } from "react-dom";
import { useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react"
import image1 from "../assets/Images/visa.png"
import { enrollCourse } from "../apis/individual-api";
import { CurrentUserContext } from "../hooks/CurrentUserContext";
import { useParams } from "react-router-dom";
import { usePromo } from "../apis/promos-api";

export default function BuyCourse({ open, onClose }) {

    const [name, setName] = useState("");
    const [promo, setPromo] = useState("");
    const [cardno, setCardno] = useState("");
    const [date, setDate] = useState("");
    const [cvv, setCvv] = useState("");
    const {id} = useParams()
    const [user] = useContext(CurrentUserContext)
    const [enrolled, setEnrolled] = useState(false);


  function escHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  const enroll = async () => {

    if (name === "" || cardno === "" || date === "" || cvv === "") {
        alert("Please fill in all the fields");
        return
    }

    try {
        let res = await enrollCourse({_id: user._id, courseid: id})
        
        if(res.status == 200) {

            setEnrolled(true)
            alert("Enrolled Successfully");
            setTimeout(() =>{
                setEnrolled(false)
            }, 3000)

            setTimeout(() =>{
                onClose()
            }, 4000)
        }
        


    } catch (error) {
        alert("You are already enrolled ");

        console.log(error);
    }

  }

  const useDiscount = async () => {

    try {
        let res = await usePromo({promoCode: promo, courseid: id})
        
        if(res.status == 200) {

           alert(res.data.msg)

        }
        


    } catch (error) {

        console.log(error);
    }
  }


  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-black ${
            open ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        {/* content */}
        <div
          className={`relative mx-auto mt-16 h-[70%] bg-white shadow-lgh w-[40%] max-w-screen-sm p-4 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out rounded-lg`}
        >
          <div className="absolute right-4">
            <button onClick={onClose}>
              <span>
                <AiOutlineClose />
              </span>
            </button>
          </div>
    <div className="mt-8 ">
      <div className="flex flex-col gap-4">
        
        <img src={image1} alt="description" ></img>
        

        <div className="body1">
          <p>Name on card</p>
        <input type="text" 
          className="border rounded-md p-2"

         onChange={(e) => setName(e.target.value)} required />
        </div>
        
        <div className="body2">
          <p>Card number</p>
        <input type="text" 
          className="border rounded-md p-2"

         onChange={(e) => setCardno(e.target.value)} required />
        </div>
      
      <div className="body">
          <p>CVV</p>
          <input type="text" placeholder="XXX" required 
          className="border rounded-md p-2 appearance-none"
          maxLength="3"
          onChange={(e) => setCvv(e.target.value)} />
       </div>
       


        <div className="body4">
          <p>Expiration date</p>
          <input type="date"  
          className="border rounded-md p-2"
          onChange={(e) => setDate(e.target.value)} required />

        </div>

        <div className="flex flex-row gap-4 items-center">
          <p>Promo code</p>
          <input type="text"  
          className="border rounded-md"
          onChange={(e) => setPromo(e.target.value)} required />

        <button
            className={"rounded-md border px-2 py-1 mt-4"}
            onClick={useDiscount}
          >
            Redeem
          </button>

        </div>

            <div className="footer">
          <button
            className={enrolled ? "rounded-md border px-4 py-2 mt-4 bg-green-500" : "rounded-md border px-4 py-2 mt-4"}
            onClick={enroll}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}
