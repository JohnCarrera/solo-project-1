
const LOAD_GROUPS = 'groups/LOAD';
const ADD_GROUP = 'groups/ADD';
const UPDATE_GROUP = 'groups/UPDATE';
const DELETE_GROUP = 'groups/DELETE';

const loadGroups = groupList => ({
    type: LOAD_GROUPS,
    groupList
});




export const getAllGroups = () => async dispatch => {
    const res = await fetch('/api/groups');

    if (res.ok) {
        const groups = await res.json();
        console.log('groups in thunk:', groups);
        dispatch(loadGroups(groups));
    }
}

const initialState = {
    allGroups: {
        /* [groupId]: { groupdata }*/
    },
    singleGroup: {
        groupData: {},
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
            console.log('loading groups...');
            const allGroups = {};
            action.groupList.reduce((acc, cur) => {
                console.log('acc:', acc);
                console.log('cur:', cur);
                acc[cur.id] = cur;
                return acc;
            }, allGroups);
            return {
                ...state,
                allGroups,
            }
        default:
            return state;
    }
}
