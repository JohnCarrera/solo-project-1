import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BrowsePage from "./components/BrowsePage";
import EntityNav from "./components/EntityNav";
import GroupsPage from "./components/GroupsPage";

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
                    </Route>
                    <Route path='/groups'>
                        <GroupsPage />
                    </Route>
                    <Route path='/browse'>
                        <EntityNav />
                        <BrowsePage />
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
