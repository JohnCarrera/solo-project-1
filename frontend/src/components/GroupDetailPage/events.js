import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsByGroupId } from '../../store/events';
import SingleEventListItem from './SingleGroupEventItem.js';
import { useParams } from 'react-router-dom';
import './events.css';

export default function EventsPage() {

    const params = useParams();
    const { groupId } = params;
    const dispatch = useDispatch();

    const allEvents = useSelector(state => {
        return state.events.allEvents
    });

    useEffect(() => {
        dispatch(getEventsByGroupId(groupId));
    }, [dispatch]);


    return (allEvents &&
        <div className='gd-events-page-body'>
            <div className='gd-events-outer-group-column'>
                <div className='gd-events-inner-group-column'>
                    {Object.values(allEvents).map(event => (
                        <SingleEventListItem event={event} />
                    ))}
                </div>
            </div>
        </div>
    )
}
