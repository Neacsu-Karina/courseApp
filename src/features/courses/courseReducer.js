import { CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE, FETCH_COURSES, LISTEN_TO_COURSE_CHAT, CLEAR_COMMENTS, LISTEN_TO_SELECTED_COURSE, CLEAR_COURSES } from './courseConstants';

const initialState = {
  courses: [],
  comments: [],
  moreCourses: true,
  selectedCourse: null
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
          moreCourses: payload.moreCourses
        }
        case LISTEN_TO_COURSE_CHAT:
          return{
            ...state,
            comments:payload,
          };
          case CLEAR_COMMENTS:
            return{
              ...state,
              comments:[],
            };

            case LISTEN_TO_SELECTED_COURSE:
              return{
              ...state,
              selectedCourse: payload
              }

              case CLEAR_COURSES:
                return {
                  ...state,
                  courses: [],
                  moreCourses: true
                }

    default:
      return state;
  }
}
