import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

export default function SingleEventListItem({ event }) {



    //TODO: ADD MORE EVENT INFO AND REFORMAT LIST ITEM



    return (
        <Link className='link-wrap-event-list'
         to={`/events/${event.id}`}
         >
            <div className='event-list-item'>
                <div className='prev-img-grp-list'>
                    <img className='event-list-image'
                    src='https://images.pexels.com/photos/7182668/pexels-photo-7182668.jpeg'
                    />
                </div>
                <div className='event-details'>
                    <div className='event-title'>
                        {event.name}
                    </div>
                    <div className='event-citystate'>
                        {event.Group.city}, {event.Group.state}
                    </div>
                    <div>
                        <p className='event-about'>{event.description}</p>
                    </div>
                    <div className='event-members-prv'>
                        {event.numAttending}
                        {' '}attending -{' '}
                        {event.Group.private ? 'Private' : 'Public'}
                    </div>
                </div>
            </div>
        </Link>
    )
}
