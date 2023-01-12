import axios from "axios";


const baseUrl = 'http://localhost:8000/auth/'


export const requestPasswordReset = async (user) => {
  try {
    let response = await axios.request({
      method: "POST",
      url: baseUrl + "requestPasswordReset",
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

export const resetPassword = async (user) => {
  try {
    let response = await axios.request({
        method: "POST",
        url: baseUrl + "PasswordReset",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(user),
    });

    return response;
    
  } catch (err) {
    throw new Error(err);
  }
}

