import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/groups';

export default function GroupsPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);


  return (
    <div>Groups Page</div>
  )
}
