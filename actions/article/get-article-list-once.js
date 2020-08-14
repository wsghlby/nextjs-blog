import {GET_ARTICLE_LIST_SUCCESS, GENERAL_ERROR, TEST_TEST} from "@/redux/reducer/type";
import firebase from "../../firebase";
import { message } from 'antd';

// Signing in with Firebase
export const getArticleListOnce = () => async dispatch => {
    const articleListListener = snapshot => {
        // console.log('getArticleList!!');
        // console.log(snapshot.val());
        dispatch({
            type: GET_ARTICLE_LIST_SUCCESS,
            articleList: snapshot.val(),
        });
    };
    try {
        // console.log('getting ArticleList~~~');
        // console.log(new Date().toLocaleString());
        // console.log(firebase.database().child('folderList'));
        // console.log(firebase.database().child('folderList').once('value'));
        // dispatch({
        //     type: TEST_TEST,
        //     TEST_TEST: 'TEST_TEST',
        // });
        const res = await firebase.database().ref().child('articleList').once('value').then(snapshot => {
            console.log('getArticleList!!');
            // console.log(snapshot.val());
            dispatch({
                type: GET_ARTICLE_LIST_SUCCESS,
                articleList: snapshot.val(),
            });
        });
        return res;
    } catch (error) {
        dispatch({ type: GENERAL_ERROR, payload: "Invalid login credentials" });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
