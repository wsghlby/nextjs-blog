import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import folderReducer from './folder/folderReducer';
import articleReducer from './article/articleReducer'
// import { firebaseReducer } from "react-redux-firebase";
const reducer = combineReducers({
    // firebaseReducer,
    auth: authReducer,
    folder: folderReducer,
    article: articleReducer
});
export default reducer;
