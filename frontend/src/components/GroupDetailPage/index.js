import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroup } from '../../store/groups';
import { useParams } from 'react-router-dom';
import { NavLink, Route, useLocation, Link } from 'react-router-dom';
import SingleGroupListItem from '../SingleGroupListItem';
import './index.css';

export default function GroupDetailPage() {

    const params = useParams();
    const { groupId, path } = params;
    const groupDetail = useSelector(state => state.groups.singleGroup);
    const dispatch = useDispatch();
    const loc = useLocation();


    useEffect(() => {
        dispatch(getSingleGroup(groupId));
    }, []);

    return (
        <div className='main-page'>
            <div className='upper'>
                <div className='img-div'>
                    <img className='preview-image'
                        src='https://images.pexels.com/photos/36039/baby-twins-brother-and-sister-one-hundred-days.jpg?'
                    >
                    </img>
                </div>
                <div className='upper-left-info'>
                    <div className='title'>{groupDetail.name}</div>
                    <div className='location'>
                        {groupDetail.city}, {groupDetail.state}
                    </div>
                    <div className='member-count'>
                        {groupDetail.numMembers}
                        {' '}members -{' '}
                        {groupDetail.private ? 'Private' : 'Public'}
                    </div>
                    <div className='organizer'></div>
                </div>
            </div>
            <div className='mid'>
                <div className='group-nav'>
                    <NavLink to={`/groups/${groupId}/about`}
                        activeClassName='group-nav-active'
                    >
                        About
                    </NavLink>
                    <NavLink to={`/groups/${groupId}/events`}>
                        Events
                    </NavLink>
                </div>
                <div>
                    <Link to={`/groups/${groupId}/edit`}>
                        Edit Group
                    </Link>
                </div>
            </div>
            <div className='lower'>

            </div>
        </div>
    )
}
