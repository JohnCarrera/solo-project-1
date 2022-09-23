import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'events/LOAD';
const LOAD_EVENTS_GROUP = 'events/LOAD_BY_GROUP';
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
    const res = await csrfFetch('/api/events');

    if(res.ok) {
        const events = await res.json();
        console.log('events:', events);
        dispatch(loadAll(events.Events));
        return events.Events;
    }
    return null;
}

export const getSingleEvent = (id) => async dispatch => {
    const res = await csrfFetch(`/api/events/${id}`);;

    if(res.ok) {
        const event = await res.json();
        console.log('event:', event);
        dispatch(loadOne(event));
        return event;
    }
    return null;
}

export const getEventsByGroupId = (id) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${id}/events/`);;

    if(res.ok) {
        const events = await res.json();
        console.log('eventsbyGroup:', events);
        dispatch(loadAll(events.Events));
        return events;
    }
    return null;
}

export const createEvent = (groupId, event) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        body: JSON.stringify(event)
    });

    if(res.ok) {
        const event = await res.json();
        console.log('eventcreate:', event);
        dispatch(add(event));
        return event;
    }
    return null;
}

export const deleteEvent = (id) => async dispatch => {
    const res = await csrfFetch(`/api/events/${id}`,{
        method: 'DELETE'
    });

    if(res.ok) {
        const delRes = await res.json();
        console.log('delEvent in Thunk: ', delRes);
        dispatch(del());
        return delRes;
    }
    return null;
}

const initialState = {
    allEvents: {},
    singleEvent: {
        Group: {}
    }
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS_GROUP:
        case LOAD_EVENTS:
            const allEvents = {};
            action.eventList.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, allEvents);
            return { ...state, allEvents: allEvents }

        case LOAD_ONE_EVENT:
        case ADD_EVENT:
            const singleEvent = action.event;
            return { ...state, singleEvent: singleEvent }

        case DELETE_EVENT:
            const delState = {...state, singleEvent: {}};
            return delState;

        default: return state;
    }
}
