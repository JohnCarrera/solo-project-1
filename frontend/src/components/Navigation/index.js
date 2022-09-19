import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
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
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        );
    }

    return (
        <div className='main-nav-top'>
            <div className='home-link-div'>
                <NavLink exact to="/">Home</NavLink>
            </div>
            <div className='sessionLinks-div'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
