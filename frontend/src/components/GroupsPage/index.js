import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/groups';
import SingleGroupListItem from '../SingleGroupListItem';
import './index.css';

export default function GroupsPage() {

    const allGroups = useSelector(state => {
        return state.groups.allGroups
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);


    return (allGroups &&
        <div className='page-body'>
            <div className='outer-group-column'>
                <div className='inner-group-column'>
                    <ul className='group-ul'>
                        {Object.values(allGroups).map(group => (
                            <li className='group-li' key={group.id}>
                                <SingleGroupListItem group={group} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
