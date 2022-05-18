import { combineReducers } from 'redux';
import { localeReducer, modalReducer } from './common';
import { loaderReducer, searchReducer } from './api';

const rootReducers = combineReducers({
    locale: localeReducer,
    modal: modalReducer,
    loader: loaderReducer,
    findData : searchReducer
});
export type ReduxStates = ReturnType<typeof rootReducers>;
export default rootReducers;
