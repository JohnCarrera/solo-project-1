import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
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
                <Modal className='lm' onClose={() => setShowModal(false)}>

                    <div className='login-modal-main-div'>
                        <div className='lm-div-top'>
                            <div className="lm-log-in-title">
                                Log in
                            </div>
                            <div className='lm-logo-div'>
                                <img className='login-modal-logo-main' src={leetUpLogo} />
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
