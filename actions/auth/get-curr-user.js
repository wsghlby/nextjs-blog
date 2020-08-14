import { GOT_USER_INFO } from "../../redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';
import { get } from '@/redux/local-storage'

// Signing in with Firebase
export const getCurrUser = () => async dispatch => {
    try {
        let currUser = get('user');
        if (currUser) {
            dispatch({
                type: GOT_USER_INFO,
                username: currUser.username,
                admin: currUser.admin,
                login: true
            });
        }
        // else {
        //     currUser = await firebase.auth().currentUser;
        //     console.log('getting currUser');
        //     console.log(currUser);
        //     if (currUser) {
        //         dispatch({
        //             type: GOT_USER_INFO,
        //             username: currUser.displayName,
        //             admin: currUser.displayName === 'admin',
        //             login: true
        //         });
        //     }
        // }
        return currUser;
    } catch (error) {
        // dispatch({ type: SIGNIN_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
