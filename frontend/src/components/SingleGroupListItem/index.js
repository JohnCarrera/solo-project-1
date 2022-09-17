import React from 'react'
import { useSelector } from 'react-redux';
import './index.css';

export default function SingleGroupListItem({group}) {

    //const { group } = group

  return (
    <div className='group-list-item'>
        <div className='preview-image'>
            <image src='https://images.pexels.com/photos/13284747/pexels-photo-13284747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        </div>
        <div>
            <div className='group-title'>
                {group.name}
            </div>
            <div>
                {group.city}, {group.state}
            </div>
            <div>
                {group.about}
            </div>
            <div>
                {group.numMembers} members - {group.private ? 'Private' : 'Public'}
            </div>
        </div>
    </div>
  )
}
