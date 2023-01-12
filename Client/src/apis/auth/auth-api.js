import axios from "axios";


const baseUrl = 'http://localhost:8000/auth/'


export const signin = async (user) => {
  try {
    let response = await axios.request({
      method: "POST",
      url: baseUrl + 'signin',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    });

    return response;

  } catch (err) {
    throw new Error(err)
  }
}

export const signout = async () => {
  try {
    let response = await axios.request({
        method: "GET",
        url: baseUrl + "signout"
    });

    return response;
    
  } catch (err) {
    throw new Error(err);
  }
}
