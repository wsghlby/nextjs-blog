import {GET_FOLDER_LIST, GENERAL_ERROR} from "@/redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';

// Signing in with Firebase
export const getFolderList = () => async dispatch => {
    try {
        // console.log('getting~~~FolderList');
        // console.log(firebase.database().child('folderList'));
        // console.log(firebase.database().child('folderList').once('value'));

        const res = await firebase.database().ref().child('folderList').once('value').then(snapshot => {
            console.log('got folder list~');
            const tempObj = snapshot.val();
            const foldersList = [];
            for (const key in tempObj) {
                if (tempObj.hasOwnProperty(key)) {
                    foldersList.push(tempObj[key].folder);
                }
            }
            console.log(foldersList);
            console.log(snapshot.val());
            dispatch({
                type: GET_FOLDER_LIST,
                foldersList: foldersList,
            });
        });
        return res;
    } catch (error) {
        dispatch({ type: GENERAL_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
