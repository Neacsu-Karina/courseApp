import {combineReducers} from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import courseReducer from '../../features/courses/courseReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
    test: testReducer,
    course: courseReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer
})

export default rootReducer;