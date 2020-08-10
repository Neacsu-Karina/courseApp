import { CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE, FETCH_COURSES, LISTEN_TO_COURSE_CHAT, LISTEN_TO_SELECTED_COURSE, CLEAR_COURSES } from './courseConstants';
import {asyncActionStart, asyncActionFinish, asyncActionError} from '../../app/async/asyncReducer';
import {fetchCoursesFromFirestore, dataFromSnapshot} from '../../app/firestore/firestoreService';

export function fetchCourses(predicate, limit, lastDocSnapshot) {
    return async function(dispatch) {
        dispatch(asyncActionStart())
        try {
            const snapshot = await fetchCoursesFromFirestore(predicate, limit, lastDocSnapshot).get();
            const lastVisible = snapshot.docs[snapshot.docs.length-1];
            const moreCourses=snapshot.docs.length >= limit;
            const courses=snapshot.docs.map(doc=> dataFromSnapshot(doc));
            dispatch({type: FETCH_COURSES, payload: {courses, moreCourses}});
            dispatch(asyncActionFinish());
            return lastVisible;
        } catch (error) {
            dispatch(asyncActionError(error));
        }
    }
}

export function listenToSelectedCourse(course){
    return{
        type:LISTEN_TO_SELECTED_COURSE,
        payload: course
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

export function clearCourses() {
    return {
      type: CLEAR_COURSES,
    };
  }