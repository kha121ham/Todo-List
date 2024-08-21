import axios from "axios";
import { setAlert } from './alert';
import { 
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    LOGOUT
        } from "./types";

//get user profile
export const getCurrentProfile= () => async dispatch =>{
    try {
        const res =await axios.get('/api/Profile/me');
        dispatch ({
            type: GET_PROFILE,
            payload:res.data
            });
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
            })
            }
};

//create or update profile
export const createProfile= (formData) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Profile Updated','success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'));
            });
        };
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        });
    }
};


//delete account
export const deleteAcount = () => async dispatch => {
    try {
         await axios.delete('/api/profile');
        dispatch({type:CLEAR_PROFILE});
        dispatch({type:ACCOUNT_DELETED});
        dispatch({type:LOGOUT});
        dispatch(setAlert('Account deleted'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg:err.response.statusText, status:err.response.status }
        });
    }
}