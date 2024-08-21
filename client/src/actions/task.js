import axios from "axios";
import { 
    ADD_TASK,
    DELETE_TASK,
    GET_TASKS,
    TASK_ERROR
    } from "./types";

//Add task
export const addTask = text => async dispatch =>{
    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/todo',text,config);
        dispatch({
            type:ADD_TASK,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:TASK_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        })
    }
};


//Get tasks
export const getTasks = () => async dispatch => {
    try {
        const res = await axios.get('/api/todo');
        dispatch({
            type:GET_TASKS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:TASK_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        })
    }
};

//Delete task
export const deleteTask = taskId => async dispatch =>{
try {
    await axios.delete(`/api/todo/${taskId}`);
    dispatch({
        type:DELETE_TASK,
        payload:taskId
    })
} catch (err) {
    dispatch({
        type:TASK_ERROR,
        payload: { msg:err.response.statusText, status:err.response.status }
    })
}
};

