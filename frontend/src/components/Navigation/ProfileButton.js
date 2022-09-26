import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import userIcon from '../../img/user-secret.svg';
import upIcon from '../../img/angle-up.svg';
import downIcon from '../../img/angle-down.svg';
import "./profileButton.css";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className="nav-profile-button" onClick={openMenu} id={showMenu ? 'open' : 'closed'}>
                <div className="profile-btn-grp">
                    <img className="profile-button-pic" src={userIcon} />
                    <img className="profile-arrow-btn" src={showMenu ? upIcon : downIcon} />
                </div>

            {/* {showMenu && ( */}
                <div className="nav-menu-elements">
                    {user.username}
                    {user.email}
                    <button className="logout-btn" onClick={logout}>Log Out</button>
                </div >
            {/* )
        } */}

        </div>
        </>
    );
}

export default ProfileButton;
