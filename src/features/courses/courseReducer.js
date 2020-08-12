import {
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  FETCH_COURSES,
  LISTEN_TO_COURSE_CHAT,
  CLEAR_COMMENTS,
  LISTEN_TO_SELECTED_COURSE,
  CLEAR_COURSES,
  SET_FILTER,
  SET_START_DATE,
  RETAIN_STATE,
  CLEAR_SELECTED_COURSE,
} from "./courseConstants";

const initialState = {
  courses: [],
  comments: [],
  moreCourses: true,
  selectedCourse: null,
  lastVisible: null,
  filter: "all",
  startDate: new Date(),
  retainState: false,
};

export default function courseReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_COURSE:
      return {
        ...state,
        courses: [...state.courses, payload],
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: [
          ...state.courses.filter((crs) => crs.id !== payload.id),
          payload,
        ],
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: [...state.courses.filter((crs) => crs.id !== payload)],
      };
    case FETCH_COURSES:
      return {
        ...state,
        courses: [...state.courses, ...payload.courses],
        moreCourses: payload.moreCourses,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_COURSE_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };

    case LISTEN_TO_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: payload,
      };

    case CLEAR_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: null,
      };

    case CLEAR_COURSES:
      return {
        ...state,
        courses: [],
        moreCourses: true,
        lastVisible: null,
      };

    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreCourses: true,
        filter: payload,
      };

    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreCourses: true,
        startDate: payload,
      };

    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };

    default:
      return state;
  }
}
