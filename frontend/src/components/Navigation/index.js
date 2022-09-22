import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import leetupLogoSmall from '../../img/leet-up.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='main-nav-profile-btn'>
            <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='main-nav-profile-btn'>
                <LoginFormModal />
                <NavLink className='main-nav-link-text' to="/signup">Sign Up</NavLink>
            </div>
        );
    }

    return (
        <div className='main-nav-top'>
            <div className='home-link-div'>
                <NavLink exact to="/">
                    <img className='nav-link-home-logo'
                        src={leetupLogoSmall}
                    />
                </NavLink>
            </div>
            <div className='sessionLinks-div'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
