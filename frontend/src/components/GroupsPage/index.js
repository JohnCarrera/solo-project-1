import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/groups';
import SingleGroupListItem from '../SingleGroupListItem';

export default function GroupsPage() {

    const allGroups = useSelector(state => {
        return state.groups.allGroups
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);


    return ( allGroups &&
        <div>
            <div>Groups Page</div>
            <ul>
            {Object.values(allGroups).map(group => (
                <li key={group.id}>
                    <SingleGroupListItem group={group} />
                </li>
            ))}
            </ul>
        </div>
    )
}
