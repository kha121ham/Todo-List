import {
    ADD_TASK,
    GET_TASKS,
    DELETE_TASK,
    TASK_ERROR,
    } from "../actions/types";

const initialState = {
    tasks:[],
    task:null,
    loading:true,
    error:{}
};

export default function(state=initialState,action) {
    const { type, payload } = action;
    switch(type) {
        case ADD_TASK:
            return {
                ...state,
                tasks:[payload,...state.tasks]
            };
        case TASK_ERROR:
            return {
                ...state,
                error:payload,
                loading:false,
            }
        case GET_TASKS:
            return {
                ...state,
                tasks:payload,
                loading:false,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks:state.tasks.filter(task=>task._id !==payload),
                loading:false
            };
        default:
            return state;
    }

}