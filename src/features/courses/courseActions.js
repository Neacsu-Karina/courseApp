import { CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE, FETCH_COURSES, LISTEN_TO_COURSE_CHAT } from './courseConstants';
import {asyncActionStart, asyncActionFinish, asyncActionError} from '../../app/async/asyncReducer';
import {fetchSampleData} from '../../app/api/mockApi';

export function loadCourses() {
    return async function(dispatch) {
        dispatch(asyncActionStart())
        try {
            const courses = await fetchSampleData();
            dispatch({type: FETCH_COURSES, payload: courses});
            dispatch(asyncActionFinish())
        } catch (error) {
            dispatch(asyncActionError(error));
        }
    }
}

export function listenToCourses(courses){
    return{
        type:FETCH_COURSES,
        payload: courses
    }
}

export function createCourse(course) {
    return {
        type: CREATE_COURSE,
        payload: course
    }
}

export function updateCourse(course) {
    return {
        type: UPDATE_COURSE,
        payload: course
    }
}

export function deleteCourse(courseId) {
    return {
        type: DELETE_COURSE,
        payload: courseId
    }
}

export function listenToCourseChat(comments) {
    return {
        type: LISTEN_TO_COURSE_CHAT,
        payload: comments
    }
}