const CastReducer = (state, action) => {
  switch (action.type) {
    case "GET_CASTS_START":
      return {
        casts: [],
        isFetching: true,
        error: false,
      };
    case "GET_CASTS_SUCCESS":
      return {
        casts: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CASTS_FAILURE":
      return {
        casts: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_CAST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_CAST_SUCCESS":
      return {
        casts: state.casts.filter((cast) => cast._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_CAST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_CAST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_CAST_SUCCESS":
      return {
        casts: [...state.casts, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_CAST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_CAST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_CAST_SUCCESS":
      return {
        casts: state.casts.map(
          (cast) => cast._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_CAST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CastReducer;
