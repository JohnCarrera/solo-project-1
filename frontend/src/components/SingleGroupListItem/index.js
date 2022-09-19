import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

export default function SingleGroupListItem({ group }) {

    //const { group } = group

    return (
        <Link className='a-tag' to={`/groups/${group.id}/about`}>
            <div className='group-list-item'>
                <div className='preview-image'>
                    <img className='group-image' src='https://images.pexels.com/photos/7182668/pexels-photo-7182668.jpeg' />
                </div>
                <div className='group-details'>
                    <div className='group-title'>
                        {group.name}
                    </div>
                    <div className='group-citystate'>
                        {group.city}, {group.state}
                    </div>
                    <div>
                        <p className='group-about'>{group.about}</p>
                    </div>
                    <div className='group-members-prv'>
                        {group.numMembers} members - {group.private ? 'Private' : 'Public'}
                    </div>
                </div>
            </div>
        </Link>
    )
}
