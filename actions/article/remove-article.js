import { GENERAL_ERROR } from "@/redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';

// Signing in with Firebase
export const removeArticle = ( key ) => async dispatch => {
    try {
        console.log(new Date().toLocaleString());
        console.log('removeFolderList!!');
        // console.log(firebase.database().child('folderList'));
        // console.log(firebase.database().child('folderList').once('value'));
        firebase.database().ref('articleList/').child(key).remove().then(() => {
            message.success('Article deleted');
        }).catch((error) => {
            dispatch({
                type: GENERAL_ERROR,
            });
            message.error(`Error: ${error.code}`);
            console.log(error);
        });
    } catch (error) {
        dispatch({ type: GENERAL_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
