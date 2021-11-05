import React, { useContext, useRef} from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "../Stylesheets/loginSignup.css";
import Header from "./Header";


const Login = (props) => {
  const {login} = useContext(AuthContext);
  const leid = useRef();
  const lpwd = useRef();
  const eid = useRef();
  const pwd = useRef();
  const nameUser = useRef();

  const history = useHistory();

  
  const handleLogin = async(e)=>{
      e.preventDefault();
      try{
        const response = await login(leid.current.value,lpwd.current.value);
        if(response.hasOwnProperty("error")){
          props.showAlert(response.error,"danger");
        }else{
          localStorage.setItem("token",response.authToken);
          props.showAlert("Successfully Logged In","success");
          history.push("/");
        }
        
      }catch(err){
        console.log(err);
        props.showAlert("Some Internal Error Occured","info");
      }
  }
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser",{
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({name:nameUser.current.value,email:eid.current.value,password:pwd.current.value})
      })
      const data = await response.json();
      if(data.hasOwnProperty("error")){
        props.showAlert(data.error,"danger");
      }else{
        localStorage.setItem("token",data.authToken);
        props.showAlert("Successfully Signed Up","success");
        history.push("/");
      }
    } catch (err) {
      props.showAlert("Some Internal Error Occured","info");;
    }
  };

  return (
    <>
    <Header></Header>
    <Container className = "d-flex align-items-center justify-content-center loginContainer">
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true"></input>

            <div className="signup">
              <form autoComplete="off">
                <label htmlFor="chk" aria-hidden="true">Sign Up</label>
                <input className="regInput" type="text" name="txt" placeholder="Name" required ref={nameUser} autoComplete="off" minLength={3}></input>
                <input className="regInput" type="text" name="email" placeholder="Email" ref={eid} autoComplete="off"></input>
                <input type="password" className="regInput" name="pwd" placeholder="Password" autoComplete="off" required ref={pwd} minLength={5}></input>
                <button onClick={handleSignUp} className="loginBtn">Sign Up</button>
              </form>
            </div>

            <div className="login">
            <form>
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input className="regInput" type="text" name="email" placeholder="Email" required ref={leid} autoComplete="off"></input>
                <input className="regInput" type="password" name="pwd" placeholder="Password" required ref={lpwd} autoComplete="off"></input>
                <button onClick={handleLogin} className="loginBtn">Login</button>
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