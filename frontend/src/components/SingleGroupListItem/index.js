import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapPin from '../../img/map-pin.svg';
import './index.css';

export default function SingleGroupListItem({ group }) {

    //const { group } = group

    return (
        <Link className='link-wrap-group-list'
         to={`/groups/${group.id}/about`}
         >
            <div className='group-list-item'>
                <div className='prev-img-sgrp-list'>
                    <img className='group-list-image'
                    src={group.previewImage}
                    />
                </div>
                <div className='group-details'>
                    <div className='group-title'>
                        {group.name}
                    </div>
                    <div className='group-citystate'>
                        {/* <div className='ed-icon-div'> */}
                            <img className='gl-pin-icon' src={mapPin} />
                       {/* / */}
                        {/* <div> */}
                            {group.city}, {group.state}
                        {/* </div> */}
                    </div>
                    <div>
                        <p className='group-about'>{group.about}</p>
                    </div>
                    <div className='group-members-prv'>
                        {group.numMembers}
                        {' '}members -{' '}
                        {group.private ? 'Private' : 'Public'}
                    </div>
                </div>
            </div>
        </Link>
    )
}
