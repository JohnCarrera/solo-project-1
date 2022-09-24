import { csrfFetch } from "./csrf";


const LOAD_GROUPS = 'groups/LOAD';
const LOAD_ONE_GROUP = 'groups/LOAD_ONE';
const ADD_GROUP = 'groups/ADD';
const ADD_IMAGE = 'groups/ADD_IMAGE'
const EDIT_GROUP = 'groups/EDIT';
const DELETE_GROUP = 'groups/DELETE';
const CLEAR_STATE = 'groups/CLEAR_STATE';

const loadAll = groupList => ({
    type: LOAD_GROUPS,
    groupList
});

const loadOne = group => ({
    type: LOAD_ONE_GROUP,
    group
});

const add = group => ({
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

const del = () => ({
    type: DELETE_GROUP,
})

const clear = () => ({
   type: CLEAR_STATE
});



export const getAllGroups = () => async dispatch => {
    const res = await fetch('/api/groups');

    if (res.ok) {
        const groups = await res.json();
        console.log('groups in thunk:', groups);
        dispatch(loadAll(groups));
        return groups;
    }
}

export const getSingleGroup = (id) => async dispatch => {
    const res = await fetch(`/api/groups/${id}`);

    if (res.ok) {
        const group = await res.json();
        console.log('single group in thunk', group);
        dispatch(loadOne(group));
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
        dispatch(add(newGroup));
        return newGroup;
    }
}

export const editGroup = (id, group) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${id}`, {
        method: 'PUT',
        body: JSON.stringify(group)
    })

    if(res.ok){
        const group = await res.json();
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

export const deleteGroup = (id) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${id}`, {
        method: 'DELETE',
    });

    if(res.ok){
        const delRes = await res.json();
        console.log('delRes in Thunk: ', delRes);
        dispatch(del());
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
        case LOAD_ONE_GROUP:
            const singleGroup = action.group;
            return { ...state, singleGroup }

        case ADD_IMAGE:
            const newState = {...state, singleGroup: {...state.singleGroup}}
            const groupImages = [];
            groupImages.push(action.image);
            newState.singleGroup.groupImages = groupImages;
            //fix this call to change the image in the list of all groups as well???
            return newState;

        case DELETE_GROUP:
            const delState = {...state, singleGroup: {}};
            return delState;

        case CLEAR_STATE:
            return initialState;

        default:
            return state;
    }
}
