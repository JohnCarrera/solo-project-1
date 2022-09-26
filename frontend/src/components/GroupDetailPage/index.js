import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroup } from '../../store/groups';
import { useParams } from 'react-router-dom';
import { NavLink, Route, useLocation, Link } from 'react-router-dom';
import SingleGroupListItem from '../SingleGroupListItem';
import mapIcon from '../../img/map-pin.svg';
import userGroup from '../../img/user-group.svg';
import orgIcon from '../../img/user-large.svg';
import './groupDetailPage.css';

export default function GroupDetailPage() {

    const params = useParams();
    const { groupId, path } = params;
    const singleGroup = useSelector(state => state.groups.singleGroup);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const loc = useLocation();


    useEffect(() => {
        dispatch(getSingleGroup(groupId));
    }, [dispatch]);

    return ( singleGroup.GroupImages &&
        <div className='gd-main-page'>
            <div className='gd-upper'>
                <div className='gd-img-div'>
                    <img className='gd-preview-image'
                        src={singleGroup?.GroupImages[0]?.url}
                    >
                    </img>
                </div>
                <div className='gd-upper-right-info'>
                    <div className='gd-title'>{singleGroup.name}</div>
                    <div className='gd-location-grp'>
                        <img className='gd-map-icon' src={mapIcon} />
                        <div className='gd-location'>
                            {singleGroup.city}, {singleGroup.state}
                        </div>
                    </div>
                    <div className='gd-member-grp'>
                        <img className='gd-member-icon' src={userGroup} />
                        <div className='gd-member-count'>
                            {singleGroup.numMembers}
                            {' '}members -{' '}
                            {singleGroup.private ? 'Private' : 'Public'}
                            {' '}group
                        </div>
                    </div>
                    <div className='gd-organizer-grp'>
                        <img className='gd-organizer-icon' src={orgIcon} />
                        <div className='gd-organizer-lead-in'>
                            Organized by
                        </div>
                        {singleGroup.Organizer &&
                            <div className='gd-organizer-info'>
                                {' '}{singleGroup.Organizer.firstName}
                                {' '}{singleGroup.Organizer.lastName}
                            </div>}
                    </div>
                </div>
            </div>
            <div className='gd-mid'>
                <div className='gd-group-nav'>
                    <NavLink to={`/groups/${groupId}/about`}
                        className='gd-group-nav-link'
                        activeClassName='gd-group-nav-link-active'
                    >
                        About
                    </NavLink>
                    <NavLink to={`/groups/${groupId}/events`}
                        className='gd-group-nav-link'
                        activeClassName='gd-group-nav-link-active'
                    >
                        Events
                    </NavLink>
                </div>
                {user && user.id === singleGroup.organizerId &&
                    <div className='gd-owner-buttons-grp'>
                        <Link to={`/groups/${groupId}/events/new`}>
                            <button
                                className='gd-owner-btn'
                            >
                                Create Event
                            </button>
                        </Link>
                        <Link to={`/groups/${groupId}/edit`}>
                        <button
                                className='gd-owner-btn'
                            >
                                Edit Group
                            </button>
                        </Link>
                    </div>}
            </div>
            <div className='gd-lower'>

            </div>
        </div>
    )
}
