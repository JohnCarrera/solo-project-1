import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleGroup } from '../../store/groups';
import { useParams } from 'react-router-dom';
import { NavLink, Route, useLocation } from 'react-router-dom';
import SingleGroupListItem from '../SingleGroupListItem';
import './groupDetailPage.css';

export default function GroupDetailAbout() {
    const params = useParams();
    const { groupId, path } = params;
    const groupDetail = useSelector(state => state.groups.singleGroup);

    console.log('about component: ', groupDetail.about)

    return (
        <div>
            <div className='group-about-title'>
                What we're about
            </div>
            <div className='group-about-body'>
                {groupDetail.about}
            </div>
        </div>
    )
}
