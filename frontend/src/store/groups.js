
const LOAD_GROUPS = 'groups/LOAD';
const SINGLE_GROUP = 'groups/LOAD_ONE';
const ADD_GROUP = 'groups/ADD';
const UPDATE_GROUP = 'groups/UPDATE';
const DELETE_GROUP = 'groups/DELETE';

const loadGroups = groupList => ({
    type: LOAD_GROUPS,
    groupList
});

const loadSingleGroup = singleGroup => ({
    type: SINGLE_GROUP,
    singleGroup
})




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

        case SINGLE_GROUP:
            const singleGroup = action.singleGroup;
            return {...state, singleGroup}

        default:
            return state;
    }
}
