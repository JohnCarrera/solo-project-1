import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEvent } from '../../store/events';
import { useParams, useHistory } from 'react-router-dom';
import { NavLink, Route, useLocation, Link } from 'react-router-dom';

import { deleteEvent } from '../../store/events';
import { getSingleGroup } from '../../store/groups';
import './eventDetailPage.css';

export default function EventDetailPage() {

    const params = useParams();
    const { eventId } = params;
    const event = useSelector(state => state.events.singleEvent);
    const group = useSelector(state => state.groups.singleGroup);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getSingleEvent(eventId))
    }, [dispatch]);

    useEffect(() => {
        if(event.Group.id){
            dispatch(getSingleGroup(event.Group.id))
        }
    }, [event]);


    const deleteEventBtn = async (e) => {
        e.preventDefault();
        const delEventMsg = await dispatch(deleteEvent(eventId));
        history.push(`/groups/${group.id}`);
    }


    return (
        <div>
            <div>EventDetailPage</div>
            <div>{event.name}</div>
            <div>Details: {event.description}</div>
            <div>Start: {event.startDate}</div>
            <div>End: {event.endDate}</div>
            <div>{event.numAttending} Attending</div>
            <div>Image {event.previewImage}</div>
            <div>Group {event.Group.name}</div>
            <div>Location {event.Group.city + ', ' + event.Group.state}</div>

            {user && group && user.id === group.organizerId &&
                <div className='ed-owner-buttons'>
                    <button onClick={deleteEventBtn}>
                        DELETE EVENT
                    </button>
                </div>}
        </div>
    )
}
