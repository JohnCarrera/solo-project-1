import React, { useState } from 'react';
import { LoginModal } from '../../context/LoginModal';
import LoginForm from './LoginForm';
import leetUpLogo from '../../img/leet-up.png'
import './loginForm.css';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                className='main-nav-login-btn'
                onClick={() => setShowModal(true)}
            >
                Log In
            </div>
            {showModal && (
                <LoginModal onClose={() => setShowModal(false)}>
                    <div className='login-modal-main-div'>
                        <div className='lm-div-top'>

                            <div className='lm-logo-div'>
                                <img
                                    className='login-modal-logo-main'
                                    src={leetUpLogo}
                                />
                            </div>
                            <div className="lm-log-in-title">
                                Log In
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                </LoginModal>
            )}
        </>
    );
}

export default LoginFormModal;
