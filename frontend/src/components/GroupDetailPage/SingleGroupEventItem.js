import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './singleGroupEventItem.css';
import mapPin from '../../img/map-pin.svg'

export default function SingleEventListItem({ event }) {

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

    return (
        <Link className='gd-link-wrap-event-list'
            to={`/events/${event.id}`}
        >
            <div className='gd-event-list-item'>
                <div className='gd-prev-img-grp-list'>
                    <img className='gd-event-list-image'
                        src={event.previewImage}
                    />
                </div>
                <div className='gd-event-details'>
                    <div className='gd-event-datetime'>
                        {eventDay}{' '}{eventMonth}{' '}
                        {eventDayOfMonth}{' '}{eventYear}{', '}
                        {eventHours > 12 ? (eventHours - 12) : eventHours}{':'}
                        {eventMinutes < 10 ? ('0' + eventMinutes) : eventMinutes}
                        {' '}{eventHours < 12 ? 'AM' : 'PM'}
                    </div>
                    <div className='gd-event-title'>
                        {event.name}
                    </div>
                    <div className='gd-event-loc-grp'>
                        <img className='gd-event-loc-icon' src={mapPin} />
                        <div className='gd-event-citystate'>
                            {event.Group.city}, {event.Group.state}
                        </div>
                    </div>
                    <div>
                        <p className='gd-event-about'>{event.description}</p>
                    </div>
                    <div className='gd-event-members-prv'>
                    {event.type + ' event hosted by ' + event.Group.name}
                    </div>
                </div>
            </div>
        </Link>
    )
}
