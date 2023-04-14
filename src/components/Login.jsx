import "./Login.css";
import {useState, useEffect} from 'react';
import { Outlet, Link } from "react-router-dom";
import emailLogo from "../resources/icons/envelope.png";
import jwt_decode from "jwt-decode";


const Login = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const fetchData = () => {
        return fetch("http://172.20.26.41:5000/api")
            .then((response)=>response.json())
            .then((data)=>console.log(JSON.stringify(data)));
    }

    
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
  }


  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"629491949981-6dlq72o30aiv6ba91mu9jgcvbh4tfd9h.apps.googleusercontent.com",
      callback:handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("google-div"),
      {theme:"outline",size:"large"}
    );

    google.accounts.id.prompt();
    document.body.className="body-login"
  },[]);


    return(
        <div className="bubble">
            <div className="custom-shape-divider-bottom-1678793596">
                <svg id="email-svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill-signin"></path>
                </svg>
            </div>
            <form className="login-form">
                <h1>Welcome to BOMT</h1>
                <h2>Login</h2>
                <input 
                    type="text"
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="email-input"
                    placeholder="Email"/>
                <input 
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)} 
                    className="password-input"
                    placeholder="Password"/>
                <div className="login-buttons">
                    <button>Login</button>
                    <Link to="/signup"><button>Sign up</button></Link>
                    <Outlet />
                </div>
                <div className="forgot-password">
                    <Link to="/forgot"><button>Forgot password?</button></Link>
                    <Outlet />
                </div>
                <div id="google-div"></div>
            </form>
        </div>
    );
}

export default Login