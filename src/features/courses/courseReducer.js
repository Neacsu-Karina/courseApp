import { CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE, FETCH_COURSES, LISTEN_TO_COURSE_CHAT, CLEAR_COMMENTS } from './courseConstants';

const initialState = {
  courses: [],
  comments: []
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
          courses: payload
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

    default:
      return state;
  }
}
