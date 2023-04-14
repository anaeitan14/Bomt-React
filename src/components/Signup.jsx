import {useState, useEffect} from 'react';
import "./Signup.css";

const Signup = () => {


    useEffect(()=> {
        document.body.className="body-signup"
    },[]);


    return (
        <div>
            <div className="custom-shape-divider-bottom-1678793596">
                <svg id="email-svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill-signup"></path>
                </svg>
            </div>
            <div className="signup-form-container">
                <h1>Create account</h1>
                    <form className="signup-form">
                        <label htmlFor='email-signup'>Email</label>
                        <input
                            type="text"
                            className="form-input"
                            id="email-signup"
                            placeholder="Email"/>
                        <label htmlFor='password-signup'>Password</label>    
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            id="password-signup"/>
                        <label htmlFor='passwordrepeat-signup'>Repeat password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Repeat password"
                            id="passwordrepeat-signup"/>
                        <label htmlFor='firstname-signup'>First name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="First name"
                            id="firstname-signup"/>
                        <label htmlFor='lastname-signup'>Last name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Last name"
                            id="lastname-signup"/>
                        <button id="signup-button">Create account</button>
                        <a style={{marginLeft:"9.5em"}} href="/login">Back to login</a>
                    </form>
            </div>
        </div>
    );
}

export default Signup
