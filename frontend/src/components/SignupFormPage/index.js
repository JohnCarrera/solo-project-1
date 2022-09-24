import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);
    const [errCount, setErrCount] = useState();

    //individual field error states
    const [emailErr, setEmailErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [confPassErr, setConfPassErr] = useState('');


    //was originally checking for truthiness of sessionUser which returns an empty
    //object if there is no session user. This is a truthy statement so it is impossible to get to
    // the signup page without instantly being redirected whether or not there is a logged in user.
    // it seems that the logout button actually sets this to null, so the logic works after phase 3
    //if (Object.keys(sessionUser).length) return <Redirect to="/" />;  this is the temp fix
    useEffect(() => {

        if (email.length && !emailCheck(email)) {
            setEmailErr('*invalid email');
        } else if (!email.length) {
            setEmailErr('*email required');
        } else {
            setEmailErr('');
        }
        if (username.length <= 3) {
            setUsernameErr('*usernames have a 4 character mininum');
        } else {
            setUsernameErr('');
        }
        if (!firstName.length) {
            setFirstNameErr('*first name required');
        } else {
            setFirstNameErr('');
        }
        if (!lastName.length) {
            setLastNameErr('*last name required');
        } else {
            setLastNameErr('');
        }
        if (!password.length) {
            setPassErr('*password required');
        } else if (password.length && password.length < 6){
            setPassErr('passwords must be at least 6 characters');
        } else {
            setPassErr('');
        }
        if (confirmPassword && !(confirmPassword === password)) {
            setConfPassErr('*passwords do not match');
        } else {
            setConfPassErr('');
        }
        //  if (!email.length) {
        //     setEmailErr('*email required');
        //  } else {
        //     setEmailErr('');
        //  }
        //  if (!email.length) {
        //     setEmailErr('*email required');
        //  } else {
        //     setEmailErr('');
        //  }

    }, [
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword
    ]);

    if (sessionUser) return <Redirect to="/" />;

    const demoUserBtnClick = (e) => {

    }

    const emailCheck = (str) => {
        return /\S+@\S+\.\S+/.test(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setBackendErrors([]);
        setRenderErrors(true);

        if (!usernameErr &&
            !emailErr &&
            !firstNameErr &&
            !lastNameErr &&
            !passErr &&
            !confPassErr
            ){
        return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setBackendErrors(data.errors);
            });
        }
    };

    const formatBackendErrors = (errorObj) => {
        const errs = [];
        for (let key in errorObj){
            errs.push(errorObj[key]);
        }
        return errs;
    }

    return (

        <div className="sm-main-page-div">
            <div className="sm-title-div">
                Sign Up
            </div>
            <div className="sm-login-err-div">
                {formatBackendErrors(backendErrors).map((error, idx) => (
                    <div className="sm-err-msg" key={idx}>{error}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="sm-form-main-div">
                    <div className="sm-input-div">
                        <div className="sm-input-inner-div">
                            <div className="sm-input-label-div">
                                <div className="sm-input-label">
                                    Email
                                </div>
                                <div className="sm-field-error">
                                    {renderErrors && emailErr.length > 0 && emailErr}
                                </div>
                            </div>
                            <div className="sm-pseudo-input">
                                <input
                                    className="sm-input-field"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm-input-div">
                        <div className="sm-input-inner-div">
                            <div className="sm-input-label-div">
                                <div className="sm-input-label">
                                    Username
                                </div>
                                <div className="sm-field-error">
                                    {renderErrors && usernameErr.length > 0 && usernameErr}
                                </div>
                            </div>
                            <div className="sm-pseudo-input">
                                <input
                                    className="sm-input-field"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm-input-div">
                        <div className="sm-input-inner-div">
                            <div className="sm-input-label-div">
                                <div className="sm-input-label">
                                    First Name
                                </div>
                                <div className="sm-field-error">
                                    {renderErrors && firstNameErr.length > 0 && firstNameErr}
                                </div>
                            </div>
                            <div className="sm-pseudo-input">
                                <input
                                    className="sm-input-field"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm-input-div">
                        <div className="sm-input-inner-div">
                            <div className="sm-input-label-div">
                                <div className="sm-input-label">
                                    Last Name
                                </div>
                                <div className="sm-field-error">
                                    {renderErrors && lastNameErr.length > 0 && lastNameErr}
                                </div>
                            </div>
                            <div className="sm-pseudo-input">
                                <input
                                    className="sm-input-field"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm-input-div">
                        <div className="sm-input-inner-div">
                            <div className="sm-input-label-div">
                                <div className="sm-input-label">
                                    Password
                                </div>
                                <div className="sm-field-error">
                                    {renderErrors && passErr.length > 0 && passErr}
                                </div>
                            </div>
                            <div className="sm-pseudo-input">
                                <input
                                    className="sm-input-field"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm-input-div">
                        <div className="sm-input-inner-div">
                            <div className="sm-input-label-div">
                                <div className="sm-input-label">
                                    Confirm Password
                                </div>
                                <div className="sm-field-error">
                                    {renderErrors && confPassErr.length > 0 && confPassErr}
                                </div>
                            </div>
                            <div className="sm-pseudo-input">
                                <input
                                    className="sm-input-field"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm-login-btn-div">
                        <button
                            className="sm-login-btn"
                            type="submit"
                        >
                            Sign Up
                        </button>

                        {/* <button    //TODO: ADD RANDOMIZED DEMO USER SIGNUP
                        className="sm-login-btn"
                        type="submit"
                        onClick={demoUserBtnClick}
                    >
                        Demo User Sign Up
                    </button> */}
                    </div>
                </div>
                {/* <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button> */}
            </form>
        </div>
    );
}

export default SignupFormPage;
