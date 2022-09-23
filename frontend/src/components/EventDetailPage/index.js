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

    const [daysOfWeek, setDaysOfWeek] = useState([
        'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
    ]);
    const [months, setMonths] = useState([
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ]);
    const [eventDate, setEventDate] = useState(
        new Date((event.startDate.substring(0, event.startDate.length - 5)))
    );
    const [eventDay, setEventDay] = useState(daysOfWeek[eventDate.getDay()]);
    const [eventMonth, setEventMonth] = useState(months[eventDate.getMonth()]);
    const [eventDayOfMonth, setEventDayOfMonth] = useState(eventDate.getDate());
    const [eventYear, setEventYear] = useState(eventDate.getFullYear());
    const [eventHours, setEventHours] = useState(eventDate.getHours());
    const [eventMinutes, setEventMinutes] = useState(eventDate.getMinutes());

    useEffect(() => {
        dispatch(getSingleEvent(eventId))
    }, [dispatch]);

    useEffect(() => {
        if (event.Group) {
            dispatch(getSingleGroup(event.Group.id))
        }
    }, [event]);


    const deleteEventBtn = async (e) => {
        e.preventDefault();
        dispatch(deleteEvent(eventId));
        history.push(`/groups/${group.id}/about`);
    }


    return (
        <div className='ed-main-page-body'>
            <div className='ed-top-info-banner'>
                <div className='ed-info-banner-date'>

                </div>
                <div className='ed-info-banner-title'>
                    {event.name}
                </div>
                <div className='ed-info-banner-host'>

                </div>
            </div>
            <div className='ed-page-body'>
                <div className='ed-left-side-grp'>
                    <img
                        className='ed-main-img'
                        src='https://images.pexels.com/photos/36039/baby-twins-brother-and-sister-one-hundred-days.jpg'
                    />
                    <div>Details</div>
                    <div>
                        {event.description}
                    </div>
                </div>
                <div className='ed-rt-side-grp'>
                    <div className='ed-group-detail-item'>
                        <img
                            className='ed-group-item-img'
                            src='https://images.pexels.com/photos/36039/baby-twins-brother-and-sister-one-hundred-days.jpg'
                        />
                        <div className='ed-group-detail-text'>
                            <div className='ed-group-detail-title'>

                            </div>
                            <div className='ed-group-detail-public'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>Start: {event.startDate}</div>
            <div>End: {event.endDate}</div>
            <div>{event.numAttending} Attending</div>
            <div>Image {event.previewImage}</div>

            {event.Group &&
                <>
                    <div>Group {event.Group.name}</div>
                    <div>Location {event.Group.city + ', ' + event.Group.state}</div>
                </>
            }
            {user && group && user.id === group.organizerId &&
                <div className='ed-owner-buttons'>
                    <button onClick={deleteEventBtn}>
                        DELETE EVENT
                    </button>
                </div>}
        </div>
    )
}
