import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BrowsePage from "./components/BrowsePage";
import EntityNav from "./components/EntityNav";
import GroupsPage from "./components/GroupsPage";
import { Link } from 'react-router-dom'
import GroupDetailPage from "./components/GroupDetailPage";


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
                <Switch>
                    <Route exact path='/'>
                        App Home
                        <Link to='/browse'>Browse</Link>
                    </Route>
                    <Route path='/browse'>
                        <BrowsePage />
                    </Route>
                    <Route path='/groups/:groupId'>
                        <GroupDetailPage />
                    </Route>
                    <Route path='/signup'>
                        <SignupFormPage />
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
