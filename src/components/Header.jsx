import React, { useEffect } from "react";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "../Stylesheets/HeaderStyles.css";


function Header() {
  let history = useHistory();
  const [userName,setUserName] = React.useState("");

  useEffect(()=>{
    updateName();
  })


  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const getUserName = async()=>{
    const response = await fetch("http://localhost:5000/api/auth/getuser",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("token")
      }
    })
    
    const data = await response.json();

    if(!data.hasOwnProperty("error")){
       return data.name;
    }else{
      return "None";
    }
  }

  const updateName = async()=>{
    if(localStorage.getItem("token")){
      let temp = await getUserName();
      const fullName = temp.split(" ");
      setUserName(fullName[0]);
    }
}

  return (
    <>
    <header>
      <Navbar collapseOnSelect expand="lg" className="header">
        <Navbar.Brand className="heading">
          <Link to="/" className="headerLink">
            Note Cloud
          </Link>
          <i className="fas fa-cloud-upload-alt cloudIcon"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {localStorage.getItem("token") && (
            <Nav>
              {/* <Nav.Link> */}
              {/* <Button variant="primary" onClick={handleLogout}>Logout</Button> */}
              {console.log(userName)}
              <span>Welcome,</span>
              <NavDropdown className="username" title={userName} id="basic-nav-dropdown">
              <NavDropdown.Item><Button variant="primary" className="logoutbtn" size="lg" onClick={handleLogout}>Logout</Button></NavDropdown.Item>
            </NavDropdown>
              {/* </Nav.Link> */}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
    </>
  );
}

export default Header;
