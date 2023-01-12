export function authenticate(jwt, cb, rememberMe) {

  if (typeof window !== "undefined"){
    // if(rememberMe)
      localStorage.setItem("jwt", jwt)
    // else
    //   sessionStorage.setItem("jwt", jwt)

  }

  cb()
}

export function isAuthenticated() {

  if (typeof window == "undefined") return false

  if (localStorage.getItem("jwt"))
    return localStorage.getItem("jwt")
  // if (sessionStorage.getItem("jwt"))
  //   return sessionStorage.getItem("jwt")
  
  else return false
}

export function clearJWT(cb) {

  if (typeof window !== "undefined"){
     localStorage.removeItem("jwt")
     sessionStorage.removeItem("jwt")
  }
  
  cb()
//   signout().then((data) => {
//     document.cookie = "t=; expires=Thu, 01 Jan 197000:00:00UTC; path=/;"
//   })
}
