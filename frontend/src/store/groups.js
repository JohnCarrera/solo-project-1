import { csrfFetch } from "./csrf";


const LOAD_GROUPS = 'groups/LOAD';
const SINGLE_GROUP = 'groups/LOAD_ONE';
const ADD_GROUP = 'groups/ADD';
const ADD_IMAGE = 'groups/ADD_IMAGE'
const EDIT_GROUP = 'groups/EDIT';
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

const addImage = image => ({
    type: ADD_IMAGE,
    image
});

const edit = group => ({
    type: EDIT_GROUP,
    group
});



export const getAllGroups = () => async dispatch => {
    const res = await fetch('/api/groups');

    if (res.ok) {
        const groups = await res.json();
        console.log('groups in thunk:', groups);
        dispatch(loadGroups(groups));
        return groups;
    }
}

export const getSingleGroup = (id) => async dispatch => {
    const res = await fetch(`/api/groups/${id}`);

    if (res.ok) {
        const group = await res.json();
        console.log('single group in thunk', group);
        dispatch(loadSingleGroup(group));
        return group;
    }
}

export const createGroup = (groupDetails) => async dispatch => {
    const res = await csrfFetch('/api/groups/', {
        method: 'POST',
        body: JSON.stringify(groupDetails)
    });

    if (res.ok) {
        const newGroup = await res.json();
        console.log('group create thunk response:', newGroup);
        dispatch(addGroup(newGroup));
        return newGroup;
    }
}


export const editGroup = (id, group) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${id}`, {
        method: 'PUT',
        body: JSON.stringify(group)
    })

    if(res.ok){
        const group =await res.json();
        console.log('group update thunk res:', group);
        dispatch(edit(group));
        return group;
    }
}

export const addGroupImage = (id, image) => async dispatch => {
    console.log('image arg in thunk', image )
    const res = await csrfFetch(`/api/groups/${id}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if(res.ok){
        const imgRes = await res.json();
        console.log('add image thunk:', imgRes);
        dispatch(addImage(imgRes));
        return imgRes;
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
        case EDIT_GROUP:
        case SINGLE_GROUP:
            const singleGroup = action.group;
            return { ...state, singleGroup }

        case ADD_IMAGE:
            const newState = {...state, singleGroup: {...state.singleGroup}}
            const groupImages = [];
            groupImages.push(action.image)
            newState.singleGroup.groupImages = groupImages;
            return newState;

        default:
            return state;
    }
}
