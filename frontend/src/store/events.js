import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'events/LOAD';
const LOAD_ONE_EVENT = 'events/LOAD_ONE';
const ADD_EVENT = 'events/ADD';
const ADD_IMAGE = 'events/ADD_IMAGE';
const EDIT_EVENT = 'events/EDIT';
const DELETE_EVENT = 'events/DELETE';

const loadAll = eventList => ({
    type: LOAD_EVENTS,
    eventList
});

const loadOne = event => ({
    type: LOAD_ONE_EVENT,
    event
});

const add = event => ({
    type: ADD_EVENT,
    event
});

const del = () => ({
    type: DELETE_EVENT
});

export const getAllEvents = () => async dispatch => {
    const res = await fetch('/api/events');

    if(res.ok) {
        const events = await res.json();
        console.log('group')
    }
}
