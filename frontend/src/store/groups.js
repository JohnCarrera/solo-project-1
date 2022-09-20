import { csrfFetch } from "./csrf";


const LOAD_GROUPS = 'groups/LOAD';
const SINGLE_GROUP = 'groups/LOAD_ONE';
const ADD_GROUP = 'groups/ADD';
const UPDATE_GROUP = 'groups/UPDATE';
const DELETE_GROUP = 'groups/DELETE';

const loadGroups = groupList => ({
    type: LOAD_GROUPS,
    groupList
});

const loadSingleGroup = group => ({
    type: SINGLE_GROUP,
    group
});

const addGroup = group => ({
   type: ADD_GROUP,
   group
});




export const getAllGroups = () => async dispatch => {
    const res = await fetch('/api/groups');

    if (res.ok) {
        const groups = await res.json();
        console.log('groups in thunk:', groups);
        dispatch(loadGroups(groups));
    }
}

export const getSingleGroup = (id) => async dispatch => {
    const res = await fetch(`/api/groups/${id}`);

    if (res.ok) {
        const group = await res.json();
        console.log('single group in thunk', group);
        dispatch(loadSingleGroup(group));
    }
}

export const createGroup = (groupDetails) => async dispatch => {
    const res = await csrfFetch('/api/groups/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupDetails)
    });

    if(res.ok){
        const newGroup = await res.json();
        console.log('group create response:', newGroup);
        dispatch(addGroup(newGroup));
    }
}


const initialState = {
    allGroups: {
        /* [groupId]: { groupdata }*/
    },
    singleGroup: {
        //group data here
        groupImages: [],
        organizer: {},
        venues: []
    },
    // events: {
    //     allEvents: {
    //         /*[eventId: {
    //         }*/
    //     }
    // }
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const allGroups = {};
            action.groupList.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, allGroups);
            return { ...state, allGroups }

        case ADD_GROUP:
        case SINGLE_GROUP:
            const singleGroup = action.group;
            return {...state, singleGroup}


        default:
            return state;
    }
}
