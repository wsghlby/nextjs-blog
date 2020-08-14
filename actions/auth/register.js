import { GOT_USER_INFO } from "../../redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';
import {save} from "@/redux/local-storage";
// Signing up with Firebase
export const register = ({email, password, username}) => async dispatch => {
    try {
        // console.log('register!');
        // console.log(email);
        // console.log(password);
        // console.log(username);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( (user) => {
                firebase.auth().currentUser.updateProfile({
                   displayName: username
                });
                save('user', {
                    username: username,
                    admin: username === 'admin',
                    login: true
                });
                dispatch({
                    type: GOT_USER_INFO,
                    username: username,
                    admin: username === 'admin',
                    login: true
                });
                message.success(`Hello ${username}`);
            })
            .catch((error) => {
                // dispatch({
                //     type: SIGNUP_ERROR,
                //     payload:
                //         "Something went wrong, we couldn't create your account. Please try again."
                // });
                message.error(`Error: ${error.code}`);
            });
    } catch (error) {
        // dispatch({
        //     type: SIGNUP_ERROR,
        //     payload:
        //         "Something went wrong, we couldn't create your account. Please try again."
        // });
        message.error(`Error: ${error.code}`);
    }
};
