import React, { useContext, useEffect, useState,useRef } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "../Stylesheets/loginSignup.css";
import Header from "./Header";

const Login = (props) => {
  const { login } = useContext(AuthContext);
  const leid = useRef();
  const lpwd = useRef();
  const eid = useRef();
  const pwd = useRef();
  const nameUser = useRef();

  const history = useHistory();
  const [pwdState,setPwdState] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      history.push("/");
    }
  })
  const togglePwdState = ()=>{
    setPwdState((currentState)=>{
      return !currentState;
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(leid.current.value, lpwd.current.value);
      if (response.hasOwnProperty("error")) {
        props.showAlert(response.error, "danger");
      }else if(response.hasOwnProperty("errors")){
        props.showAlert("Please enter a valid email","danger");
      } 
      else {
        localStorage.setItem("token", response.authToken);
        props.showAlert("Successfully Logged In", "success");
        history.push("/");
      }
    } catch (err) {
      props.showAlert("Some Internal Error Occured", "info");
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameUser.current.value,
            email: eid.current.value,
            password: pwd.current.value,
          }),
        }
      );
      const data = await response.json();
      if (data.hasOwnProperty("error")) {
        props.showAlert(data.error, "danger");
      }else if(data.hasOwnProperty("errors")) {
        props.showAlert(`Make Sure That:-
        1.Name Must Contain 3 characters
        2.Email must be valid
        3.Password Must contain 5 characters`,"danger");
      }
      else {
        localStorage.setItem("token", data.authToken);
        props.showAlert("Successfully Signed Up", "success");
        history.push("/");
      }
    } catch (err) {
      props.showAlert("Some Internal Error Occured", "info");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="welcome"><h1>Welcome To Note Cloud!!!</h1></div>
      <Container className="d-flex align-items-center justify-content-center loginContainer">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true"></input>

          <div className="signup">
            <form autoComplete="off">
              <label htmlFor="chk" aria-hidden="true">
                Sign Up
              </label>
              <input
                className="regInput"
                type="text"
                name="txt"
                placeholder="Name"
                required
                ref={nameUser}
                autoComplete="off"
                minLength="3"
                pattern=".{3,}"
              ></input>
              <input
                className="regInput"
                type="text"
                name="email"
                placeholder="Email"
                ref={eid}
                autoComplete="off"
              ></input>
              <div className="pwdvisi">
              <input
                type={pwdState?"text":"password"}
                className="pwdInput"
                name="pwd"
                placeholder="Password"
                autoComplete="off"
                required
                ref={pwd}
                minLength="5"
                pattern=".{5,}"
              ></input>
              {!pwdState?<i className="fas fa-eye pos" onClick={togglePwdState}></i>:<i className="fas fa-eye-slash pos" onClick={togglePwdState}></i>}
              </div>
              <button type="submit" onClick={handleSignUp} className="loginBtn">
                Sign Up
              </button>
            </form>
          </div>

          <div className="login">
            <form>
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                className="regInput"
                type="text"
                name="email"
                placeholder="Email"
                required
                ref={leid}
                autoComplete="off"
              ></input>
              <div className="pwdvisi">
              <input
                className="pwdInput"
                type={pwdState?"text":"password"}
                name="pwd"
                placeholder="Password"
                required
                ref={lpwd}
                autoComplete="off"
              ></input>
              {!pwdState?<i className="fas fa-eye pos" onClick={togglePwdState}></i>:<i className="fas fa-eye-slash pos" onClick={togglePwdState}></i>}
              </div>
              <button type="submit" onClick={handleLogin} className="loginBtn">
                Login
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;

// const response = await fetch("http://localhost:5000/api/auth/createuser",{
//         method: "POST",
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body: JSON.stringify({name:nameUser.current.value,email:eid.current.value,password:pwd.current.value})
//       })
//       const data = await response.json();
//       if(data.hasOwnProperty("error")){
//         props.showAlert(data.error,"danger");
//       }else{
//         localStorage.setItem("token",data.authToken);
//         props.showAlert("Successfully Signed Up","success");
//         history.push("/");
//       }

// const data = await signup(nameUser.current.value,eid.current.value,pwd.current.value);
// if(data.hasOwnProperty("error")){
//   props.showAlert(data.error,"danger");
// }else{
//   localStorage.setItem("token",data.authToken);
//   props.showAlert("Successfully signed up","success");
//   history.push("/");
// }
