import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom'
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BrowsePage from "./components/BrowsePage";
import EntityNav from "./components/EntityNav";
import GroupsPage from "./components/GroupsPage";
import GroupDetailPage from "./components/GroupDetailPage";
import GroupDetailAbout from "./components/GroupDetailPage/about";
import GroupDetailEvents from "./components/GroupDetailPage/events";
import LandingPage from "./components/LandingPage";
import BottomNav from "./components/BottomNav";


function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                //<Switch>
                <>
                    <Route exact path='/'>
                        <LandingPage />
                    </Route>
                    <Route path='/browse'>
                        <BrowsePage />
                        <Route path='/browse/groups'>
                            <GroupsPage />
                        </Route>
                        <Route path='/browse/events'>
                            {/* <EventsPage /> */}
                        </Route>
                    </Route>
                    <Route path='/groups/:groupId'>
                        <GroupDetailPage />
                        <Route path={'/groups/:groupId/about'}>
                            <GroupDetailAbout  />
                        </Route>
                        <Route path={'/groups/:groupId/events'}>
                            <GroupDetailEvents />
                        </Route>
                    </Route>
                    <Route path='/signup'>
                        <SignupFormPage />
                    </Route>
                    </>
                //</Switch>
            )}
            <BottomNav />
        </>
    );
}

export default App;
