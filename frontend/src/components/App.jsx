import React,{useState} from "react";
import Footer from "./Footer";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import MyAlert from "./MyAlert";

function App(){
    const [alert,setAlert] = useState(null);

    const showAlert = (message,type)=>{
            setAlert({
                msg:message,
                type:type
            });
            setTimeout(()=>{
                setAlert(null);
            },3000);
    }
    return (
        <>
            
            <BrowserRouter>
            <MyAlert alert = {alert}></MyAlert>
                <Switch>
                    <Route path="/" exact ><Home showAlert={showAlert}></Home></Route>
                    <Route path="/login" exact><Login showAlert={showAlert}></Login></Route>
                </Switch>
            </BrowserRouter>
            <Footer></Footer>
        </>
    )
}

export default App;