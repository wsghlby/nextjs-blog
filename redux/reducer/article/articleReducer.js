import { GET_ARTICLE_LIST_SUCCESS, TEST_TEST } from "../type";
// import { HYDRATE} from 'next-redux-wrapper';

const defaultStatus = {
    articleList: []
};

const authReducer = (state = defaultStatus, action) => {
    switch (action.type) {
        // case HYDRATE:
        //     return {...state, ...action.payload};
        case TEST_TEST:
            return {
                ...state,
                TEST_TEST: action.TEST_TEST
            };
        case GET_ARTICLE_LIST_SUCCESS:
            return {
                ...state,
                articleList: action.articleList
            };
        default:
            return state;
    }
};

export default authReducer
