import {GET_ARTICLE_LIST_SUCCESS, GENERAL_ERROR} from "@/redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';
import { getArticleListOnce } from '../article';

// Signing in with Firebase
export const UpdateArticle = (updates) => async dispatch => {
    try {
        console.log('getFolderList!!');
        console.log(new Date().toLocaleString());
        firebase.database().ref().update(updates).then( () => {
            dispatch(getArticleListOnce());
        }).catch( () => {
            // dispatch({ type: GENERAL_ERROR, payload: "Invalid login credentials" });
            message.error(`Error: ${error.code}`);
            console.log(error);
        });

    } catch (error) {
        // dispatch({ type: GENERAL_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
