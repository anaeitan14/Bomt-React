import {useState} from 'react';


const Signup = () => {
    return (
        <div>
            <h2>Create account</h2>
            <form className="signup-form">
                <input
                    type="text"
                    className="form-input"
                    placeholder="Email"/>
                <input
                    type="password"
                    className="form-input"
                    placeholder="Password"/>
                <input
                    type="password"
                    className="form-input"
                    placeholder="Repeat password"/>
                <input
                    type="text"
                    className="form-input"
                    placeholder="First name"/>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Last name"/>
            </form>
        </div>
    );
}

export default Signup
