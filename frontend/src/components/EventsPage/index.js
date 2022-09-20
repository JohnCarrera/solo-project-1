import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../store/events';
import SingleEventListItem from '../SingleEventListItem';
import '../GroupsPage/index.css';

export default function EventsPage() {

    console.log('loading events page')
    const allEvents = useSelector(state => {
        return state.events.allEvents
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);


    return (allEvents &&
        <div className='page-body'>
            <div className='outer-group-column'>
                <div className='inner-group-column'>
                    {Object.values(allEvents).map(event => (
                        <SingleEventListItem event={event} />
                    ))}
                </div>
            </div>
        </div>
    )
}
