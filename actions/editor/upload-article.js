import { EDITOR_UPLOAD_SUCCESS, EDITOR_UPLOAD_ERROR } from "../../redux/reducer/type";
import firebase from "../../firebase";
import {message} from "antd";
import {getArticleListOnce} from "@/actions/article";

export const uploadArticle = ({title, summary, content, selectedFolder, banner}) => async dispatch => {
    try {
        const newPostRef = firebase.database().ref().child('articleList').push();
        let imageStorageRef;
        const time = new Date().toISOString().slice(0, 10);
        if (banner) {
            imageStorageRef = firebase.storage().ref().child('images/'+newPostRef.key + '.png');
            imageStorageRef.put(banner).then((snapshot) => {
                imageStorageRef.getDownloadURL().then( (url) => {
                    newPostRef.set({
                        time, title, summary, content, selectedFolder, banner: url, comments: null
                    });
                    dispatch(getArticleListOnce());
                    message.success('Uploading success!');
                    // dispatch({
                    //     type: EDITOR_UPLOAD_SUCCESS,
                    // });
                }).catch((error) => {
                    // dispatch({
                    //     type: EDITOR_UPLOAD_ERROR,
                    // });
                    message.error(`Error: ${error.code}`);
                    console.log(error);
                });
            }).catch((error) => {
                // dispatch({
                //     type: EDITOR_UPLOAD_ERROR,
                // });
                message.error(`Error: ${error.code}`);
                console.log(error);
            });
        } else {
            newPostRef.set({
                time, title, summary, content, selectedFolder, banner: null, commentNumber: 0, starNumber: 0
            }).then(() => {
                message.success('Uploading success!');
                // dispatch({
                //     type: EDITOR_UPLOAD_SUCCESS,
                // });
            }).catch((error) => {
                // dispatch({
                //     type: EDITOR_UPLOAD_ERROR,
                // });
                message.error(`Error: ${error.code}`);
                console.log(error);
            });
        }


    } catch (error) {
        // dispatch({
        //     type: EDITOR_UPLOAD_ERROR,
        //     payload: "...some error message for the user..."
        // });
        message.error(`Error: ${error.code}`);
        console.log(error);
    }
};
