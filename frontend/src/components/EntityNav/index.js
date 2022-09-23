import React from 'react'
import { NavLink } from 'react-router-dom'
import GroupsPage from '../GroupsPage'
import './entityNav.css';

export default function EntityNav() {
    return (
        <div id='nav-div'>
        <nav className='entity-nav'>
            <div className='nav-ele'>
                <NavLink activeClassName='active-nav-ele'
                    className='nav-ele'
                    to='/browse/groups'
                    >
                    Groups
                </NavLink>
            </div>

            <div className='entity-nav'>
                <NavLink
                    activeClassName='active-nav-ele'
                    className='nav-ele' to='/browse/events'
                    >
                    Events
                </NavLink>
            </div>
        </nav>
        </div>
    )
}
