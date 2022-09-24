import React from 'react'
import { useEffect, useState } from 'react';
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
        if (event.Group) {
            dispatch(getSingleGroup(event.Group.id))
        }
    }, [event]);

    const [daysOfWeek, setDaysOfWeek] = useState([
        'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
    ]);

    const [daysOfWeekLong, setDaysOfWeekFull] = useState([
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]);

    const [months, setMonths] = useState([
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ]);

    const [monthsLong, setMonthsFull] = useState([
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]);

    const [eventDate, setEventDate] = useState();
    const [eventDay, setEventDay] = useState();
    const [eventMonth, setEventMonth] = useState();
    const [eventDayLong, setEventDayLong] = useState();
    const [eventMonthLong, setEventMonthLong] = useState();
    const [eventDayOfMonth, setEventDayOfMonth] = useState();
    const [eventYear, setEventYear] = useState();
    const [eventHours, setEventHours] = useState();
    const [eventMinutes, setEventMinutes] = useState();

    useEffect(() => {

        if (event.startDate) {
            setEventDate(
                new Date((event.startDate.substring(0, event.startDate.length - 5)))
            )
        }

    }, [event])

    useEffect(() => {
        if (eventDate) {
            setEventDay(daysOfWeek[eventDate.getDay()]);
            setEventDayLong(daysOfWeekLong[eventDate.getDay()]);
            setEventMonth(months[eventDate.getMonth()]);
            setEventMonthLong(monthsLong[eventDate.getMonth()]);
            setEventDayOfMonth(eventDate.getDate());
            setEventYear(eventDate.getFullYear())
            setEventHours(eventDate.getHours())
            setEventMinutes(eventDate.getMinutes())
        }
    }, [eventDate])




    const deleteEventBtn = async (e) => {
        e.preventDefault();
        dispatch(deleteEvent(eventId));
        history.push(`/groups/${group.id}/about`);
    }


    return (event && group &&
        <div className='ed-main-page-body'>
            <div className='ed-top-info-banner'>
                <div className='ed-info-banner-date'>
                    {eventDayLong}{' '}{eventMonthLong}{' '}
                    {eventDayOfMonth}{', '}{eventYear}
                </div>
                <div className='ed-info-banner-title'>
                    {event.name}
                </div>
                <div className='ed-info-banner-host-grp'>
                    <div className='ed-info-banner-hosted-by'>
                        Hosted By
                    </div>
                    {
                        <div className='ed-info-banner-host'>
                            {group?.Organizer?.firstName}
                        </div>
                    }
                </div>
            </div>
            <div className='ed-page-body'>
                <div className='ed-left-side-grp'>
                    <img
                        className='ed-main-img'
                        src='https://images.pexels.com/photos/36039/baby-twins-brother-and-sister-one-hundred-days.jpg'
                    />
                    <div className='ed-desc-header'>Details</div>
                    <div className='ed-event-desc'>
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
                            {
                                event.Group &&
                                <div className='ed-group-detail-title'>
                                    {event.Group.name}
                                </div>
                            }
                            {
                                event.Group &&
                                <div className='ed-group-detail-public'>
                                    {event.Group.private ? 'Private' : 'Public'}
                                    {' group'}
                                </div>
                            }

                        </div>
                    </div>
                    <div className='ed-date-loc-item-grp'>
                        <div className='ed-rt-item-datetime'>

                        </div>
                        <div className='ed-rt-item-loc'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='ed-bottom-info-banner'>
                <div className='ed-bot-banner-left-grp'>
                    <div className='ed-bot-banner-datetime'>
                        {eventDay}{', '}{eventMonth}{' '}
                        {eventDayOfMonth}{' - '}
                        {eventHours > 12 ? (eventHours - 12) : eventHours}{':'}
                        {eventMinutes < 10 ? ('0' + eventMinutes) : eventMinutes}
                        {' '}{eventHours < 12 ? 'AM' : 'PM'}
                    </div>
                    <div className='ed-bot-banner-title'>
                        {event.name}
                    </div>
                </div>
                <div className='ed-bot-banner-right-grp'>
                    <div className='ed-bot-banner-price'>
                        { event.price > 0 ? '$' + event.price : 'FREE'}
                    </div>
                </div>
            </div>


            {user && group && user.id === group.organizerId &&
                <div className='ed-owner-buttons'>
                    <button onClick={deleteEventBtn}>
                        DELETE EVENT
                    </button>
                </div>}
        </div>
    )
}
