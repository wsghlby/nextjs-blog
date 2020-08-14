import React from "react";
// SETTING UP REDUX STORE
import {applyMiddleware, compose, createStore} from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from './reducer';

import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {composeWithDevTools} from 'redux-devtools-extension';

// const store = createStore(
//     rootReducer,
//     {},
//     compose(composeWithDevTools(applyMiddleware(reduxThunk)))
// );

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
    } else {
        return rootReducer(state, action)
    }
}

const makeStore = context => createStore(
    reducer,
    compose(composeWithDevTools(applyMiddleware(reduxThunk)))
);

// const makeStore = (initialState, options) => createStore(
//     reducer,
//     initialState,
//     compose(composeWithDevTools(applyMiddleware(reduxThunk)))
// );

export const wrapper = createWrapper(makeStore, {debug: true});
// export { store }

// const persistConfig = {
//     key: 'root',
//     storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// const store = createStore(
//     persistedReducer,
//     {},
//     compose(composeWithDevTools(applyMiddleware(reduxThunk)))
// );
//
// const makeStore = context => store;
//
// // export default store;
// // export an assembled wrapper
// export const wrapper = createWrapper(makeStore, {debug: true});
// export let persistor = persistStore(store);
