import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapPin from '../../img/map-pin.svg';
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
                <div className='el-event-details'>
                    <div className='event-title'>
                        {event.name}
                    </div>
                    <div className='event-citystate'>
                        {/* <div className='ed-icon-div'> */}
                            <img className='ed-pin-icon' src={mapPin} />
                       {/* / */}
                        {/* <div> */}
                            {event.Group.city}, {event.Group.state}
                        {/* </div> */}
                    </div>
                    <div className='el-about-div'>
                        <p className='event-about'>{event.description}</p>
                    </div>
                    <div className='event-members-prv'>
                        {event.type + ' event hosted by ' + event.Group.name}
                    </div>
                </div>
            </div>
        </Link>
    )
}
