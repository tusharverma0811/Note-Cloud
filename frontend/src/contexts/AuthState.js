import React from "react";
import AuthContext from "./AuthContext";


const AuthState = (props) => {
  const login = async (email, password) => {
    const respone = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await respone.json();
    return data;
  };

  const signup = async(name,email,password)=>{
      const response = await fetch(`/api/auth/createuser`,{
          method: "POST",
          headers:{
              "Content-Type" : "application-json"
          },
          body: JSON.stringify({name:name,email:email,password:password})
      });

      const data = await response.json();
      return data;
  }

  // const getUser = async()=>{
  //   const response = await fetch(`${host}/api/auth/getuser`,{
  //     method: "POST",
  //     headers:{
  //       "Content-Type" : "application/json",
  //       "auth-token" : localStorage.getItem("token")
  //     },
  //   });

  //   const data = await response.json();
  //   return data;
  // }
  return (
    <AuthContext.Provider value={{login,signup}}>{props.children}</AuthContext.Provider>
  );
};

export default AuthState;
