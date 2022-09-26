import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../store/events';
import SingleEventListItem from '../SingleEventListItem';
import '../EventsPage/eventsPage.css';

export default function EventsPage() {

    // console.log('loading events page')
    const allEvents = useSelector(state => {
        return state.events.allEvents
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);


    return (allEvents &&
        <div className='events-page-body'>
            <div className='ep-outer-group-column'>
                <div className='ep-inner-group-column'>
                    {Object.values(allEvents).map(event => (
                        <SingleEventListItem event={event} />
                    ))}
                </div>
            </div>
            <div className='el-bot-pad-div'></div>
        </div>
    )
}
