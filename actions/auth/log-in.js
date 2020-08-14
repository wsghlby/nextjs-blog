import { GOT_USER_INFO } from "@/redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';
import { save } from '@/redux/local-storage'

// Signing in with Firebase
export const login = ({email, password}) => async dispatch => {
    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                const currUser = firebase.auth().currentUser;
                save('user', {
                    username: currUser.displayName,
                    admin: currUser.displayName === 'admin',
                    login: true
                });
                dispatch({
                    type: GOT_USER_INFO,
                    username: currUser.displayName,
                    admin: currUser.displayName === 'admin',
                    login: true
                });
                message.success(`Hello ${currUser.displayName}`);
            })
            .catch((error) => {
                // dispatch({
                //     type: SIGNIN_ERROR,
                //     payload: "Invalid login credentials"
                // });
                message.error(`Error: ${error.code}`);
            });
    } catch (error) {
        // dispatch({ type: SIGNIN_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
    }
};
