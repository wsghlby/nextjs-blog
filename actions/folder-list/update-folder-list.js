import { FOLDER_ERROR } from "../../redux/reducer/type";
import { getFolderList } from '.';
import firebase from "../../firebase";
import {message} from "antd";

export const updateFolderList = (folder) => async dispatch => {
    try {
        const newPostRef = firebase.database().ref().child('folderList').push();
        newPostRef.set({
            folder
        }).then(() => {
            console.log('update!');
            dispatch(getFolderList());
        }).catch((error) => {
            // dispatch({
            //     type: FOLDER_ERROR,
            // });
            message.error(`Error: ${error.code}`);
        });
    } catch (error) {
        // dispatch({
        //     type: FOLDER_ERROR,
        //     payload: "...some error message for the user..."
        // });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
