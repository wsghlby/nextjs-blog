import { GET_FOLDER_LIST, FOLDER_ERROR } from "../type";

const defaultStatus = {
    foldersList: []
};

const authReducer = (state = defaultStatus, action) => {
    switch (action.type) {
        case GET_FOLDER_LIST:
            return {
                ...state,
                foldersList: action.foldersList
            };
        case FOLDER_ERROR:
            return state;
        default:
            return state;
    }
};

export default authReducer
