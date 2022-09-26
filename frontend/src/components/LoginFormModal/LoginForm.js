import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './loginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [backendErrors, setBackendErrors] = useState([]);
    const [credentialError, setCredentialError] = useState('');
    const [renderErrors, setRenderErrors] = useState(false);
    const [passError, setPassError] = useState('');

    const demoUserBtnClick = (e) => {
        setPassError('');
        setCredentialError('');
        setCredential('johnnysmith');
        setPassword('secret password');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBackendErrors([]);
        setRenderErrors(true);

        if (credential.length && password.length) {

            return dispatch(sessionActions.login({ credential, password })).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.message) setBackendErrors(['Invalid Login']);
                }
            );
        }
    };

    useEffect(() => {

        if (!credential.length) {
            setCredentialError('*username/email required');
        } else {
            setCredentialError('');
        }
        if (!password.length) {
            setPassError('*password Required');
        } else {
            setPassError('');
        }

        setBackendErrors([]);


    }, [credential, password])





    return (
        <form onSubmit={handleSubmit}>
            <div className="lm-form-main-div">
                <div className="lm-login-err-div">
                    {backendErrors.map((error, idx) => (
                        <div className="invalid-login-msg" key={idx}>{error}</div>
                    ))}
                </div>
                <div className="lm-input-div">
                    <div className="lm-input-inner-div">
                        <div className="lm-input-label-div">
                            <div className="lm-input-label">
                                Username/Email
                            </div>
                            <div className="lm-field-error">
                                {renderErrors && credentialError.length > 0 && credentialError}
                            </div>
                        </div>
                        <div className="lm-pseudo-input">
                            <input
                                className="lm-input-field"
                                type="text"
                                maxLength={20}
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="lm-input-div">
                    <div className="lm-input-inner-div">
                        <div className="lm-input-label-div">
                            <div className="lm-input-label">
                                Password
                            </div>
                            <div className="lm-field-error">
                                {renderErrors && passError.length > 0 && passError}
                            </div>
                        </div>
                        <div className="lm-pseudo-input">
                            <input
                                className="lm-input-field"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
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
