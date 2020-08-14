import { SIGN_OUT_SUCCESS } from "../../redux/reducer/type";
import firebase from "../../firebase";
import { message } from "antd";
import { remove } from '@/redux/local-storage'

export const logout = () => async dispatch => {
    try {
        console.log('log out');
        firebase
            .auth()
            .signOut()
            .then(() => {
                remove('user');
                dispatch({ type: SIGN_OUT_SUCCESS });
            })
            .catch((error) => {
                // dispatch({
                //     type: SIGNOUT_ERROR,
                //     payload: "...some error message for the user..."
                // });
                console.log(error);
                message.error(`Error: in try `);
            });
    } catch (error) {
        // dispatch({
        //     type: SIGNOUT_ERROR,
        //     payload: "...some error message for the user..."
        // });
        console.log(error);
        message.error(`Error: ${error.code}`);
    }
};
