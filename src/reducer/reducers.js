const cloneDeep = require('lodash.clonedeep')

import { truncate } from 'lodash';
import { SAVE_ORGINAL_DATA, FILTER_TODO, RESET_FILTER_TODO } from './reducerConst';

const initialFilterValues = {
    dataFromServer: [],
    filters: {
        userid: [],
        completed: null,
        title: ""
    },
    results: []
}

function rootReducers(state = initialFilterValues, action) {
    const type = action.type;
    let newState = { ...state };
    if (type == SAVE_ORGINAL_DATA) {
        const datalist = action.payload
        newState.dataFromServer = [...datalist];
        newState.results = [...datalist];
    }
    if (type == RESET_FILTER_TODO) {
        newState = {
            ...state,
            filters: {
                ...initialFilterValues.filters
            }
        };
        const filteredResults = filterResults(newState);
        newState.results = [...filteredResults];
    }
    if (type == FILTER_TODO) {
        newState.filters = { ...action.payload }
        const filteredResults = filterResults(newState);
        newState.results = [...filteredResults];
    }
    return cloneDeep(newState);
}

const filterResults = (state) => {
    return state.dataFromServer
        .filter((todo) => {
            if (state.filters.completed == null)
                return true;
            return state.filters.completed == todo.completed
        })
        .filter((todo) => {
            if (state.filters.userid.length == 0)
                return true;
            return state.filters.userid.some((user) => user == todo.userId)
        })
        .filter((todo) => {
            if (state.filters.title.length == 0)
                return true;
            return todo.title.toLowerCase().includes(state.filters.title);

        })
}

export default rootReducers;