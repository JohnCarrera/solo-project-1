import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroup } from '../../store/groups';
import { useParams } from 'react-router-dom';
import { NavLink, Route, useLocation } from 'react-router-dom';
import SingleGroupListItem from '../SingleGroupListItem';
import './index.css';

export default function GroupDetailPage() {

    const params = useParams();
    const { groupId, path } = params;
    const groupDetail = useSelector(state => state.groups.singleGroup);
    const dispatch = useDispatch();
    const loc = useLocation();

    const { pathname } = loc;

    console.log('location:', loc)

    useEffect(() => {
        dispatch(getSingleGroup(groupId));
    }, []);

    return (
        <div className='main-page'>
            <div className='upper'>
                <div className='img-div'>
                    <img className='preview-image' src=''></img>
                </div>
                <div className='title'>{groupDetail.name}</div>
                <div className='location'>
                    {groupDetail.city}, {groupDetail.state}
                </div>
                <div className='member-count'>
                    {groupDetail.numMembers}
                    members -
                    {groupDetail.private ? 'Private' : 'Public'}
                </div>
                <div className='organizer'></div>
            </div>
            <div className='mid'>
                <div className='group-nav'>
                    <NavLink to={`about`}>About</NavLink>
                    <NavLink to={`events`}>Events</NavLink>
                </div>
                {/* TODO: add edit button for organizer */}
            </div>
            <div className='lower'>
                <Route path={`/${pathname}/about`}>
                    <div className='about-heading'>What we're about</div>
                    <div className='group-about'>{groupDetail.about}</div>
                </Route>
                <Route path={`/${pathname}/events`}>
                    <div className='event-list'>
                        {/* TODO: add events component and action/thunk
                         to lazy load events for group */}
                    </div>
                </Route>
            </div>
        </div>
    )
}
