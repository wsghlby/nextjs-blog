// import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "../type";
// import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "../type";
import { GOT_USER_INFO, SIGN_OUT_SUCCESS } from "../type";

const defaultStatus = {
    login: false,
    admin: false,
    username: null,
};

const authReducer = (state = defaultStatus, action) => {
    switch (action.type) {
        case GOT_USER_INFO:
            return {
                ...state,
                username: action.username,
                admin: action.admin,
                login: action.login
            };
        // case SIGNIN_ERROR:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     };
        // case SIGNUP_SUCCESS:
        //     return {
        //         ...state,
        //         username: action.username,
        //         admin: action.admin,
        //         login: action.login
        //     };
        // case SIGNUP_ERROR:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                login: false,
                admin: false,
                username: null
            };
        // case SIGNOUT_ERROR:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     };
        default:
            return state;
    }
};

export default authReducer
