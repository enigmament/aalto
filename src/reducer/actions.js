import { SAVE_ORGINAL_DATA, FILTER_TODO, RESET_FILTER_TODO } from './reducerConst';
import axios from "axios";


const baseURL = "https://jsonplaceholder.typicode.com/todos";

export const saveDataServer = (payload) => {
    return {
        type: SAVE_ORGINAL_DATA,
        payload
    }
};

export const filterToDo = (payload) => {
    return {
        type: FILTER_TODO,
        payload
    }
};

export const resetFilterToDo = (payload) => {
    return {
        type: RESET_FILTER_TODO,
        payload
    }
};


export const fetchToDo = () => {
    return (dispatch) => {
        return axios.get(baseURL)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: SAVE_ORGINAL_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};