import React from 'react'
import EntityNav from '../EntityNav'
import { Route, Switch } from 'react-router-dom'
import GroupsPage from '../GroupsPage'

export default function BrowsePage() {
    return (
        <div>
            <EntityNav />
            {/* <Switch> */}
                <Route path='/browse/groups'>
                    <GroupsPage />
                </Route>
                <Route path='/browse/events'>
                    {/* <EventsPage /> */}
                </Route>
            {/* </Switch> */}
        </div>
    )
}
