import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './loginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const demoUserBtnClick = (e) => {
        setCredential('johnnysmith');
        setPassword('secret password');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="lm-form-main-div">

                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="lm-input-div">
                    <div className="lm-input-inner-div">
                        <label className="lm-input-label">
                            Email
                            <div className="lm-pseudo-input">
                                <input
                                    className="lm-input-field"
                                    type="text"
                                    value={credential}
                                    onChange={(e) => setCredential(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="lm-input-div">
                    <div className="lm-input-inner-div">
                        <label className="lm-input-label">
                            Password
                            <div className="lm-pseudo-input">
                                <input
                                    className="lm-input-field"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="lm-login-btn-div">
                    <button
                        className="lm-login-btn"
                        type="submit"
                    >
                        Log In
                    </button>
                    <button
                        className="lm-login-btn"
                        type="submit"
                        onClick={demoUserBtnClick}
                    >
                        Demo User Log In
                    </button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
