import {GET_ARTICLE_LIST_SUCCESS, GENERAL_ERROR} from "@/redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';

// Signing in with Firebase
export const getArticleList = () => async dispatch => {
    const articleListListener = snapshot => {
        // console.log(snapshot.val());
        dispatch({
            type: GET_ARTICLE_LIST_SUCCESS,
            articleList: snapshot.val(),
        });
    };
    try {
        // console.log('getArticleList!!');
        // console.log(new Date().toLocaleString());
        // console.log(firebase.database().child('folderList'));
        // console.log(firebase.database().child('folderList').once('value'));

        firebase.database().ref().child('articleList').on('child_added', () => {
            firebase.database().ref().child('articleList').once('value', articleListListener);
        });
        firebase.database().ref().child('articleList').on('child_changed', () => {
            firebase.database().ref().child('articleList').once('value', articleListListener);
        });
        firebase.database().ref().child('articleList').on('child_removed', () => {
            firebase.database().ref().child('articleList').once('value', articleListListener);
        });

    } catch (error) {
        dispatch({ type: GENERAL_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
