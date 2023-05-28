// GET MOVIES
export const getCastsStart = () => ({
  type: "GET_CASTS_START",
});

export const getCastsSuccess = (casts) => ({
  type: "GET_CASTS_SUCCESS",
  payload: casts,
});

export const getCastsFailure = () => ({
  type: "GET_CASTS_FAILURE",
});

// DELETE MOVIES
export const deleteCastStart = () => ({
  type: "DELETE_CAST_START",
});

export const deleteCastSuccess = (id) => ({
  type: "DELETE_CAST_SUCCESS",
  payload: id,
});

export const deleteCastFailure = () => ({
  type: "DELETE_CAST_FAILURE",
});
// ADD MOVIE
export const createCastStart = () => ({
  type: "CREATE_CAST_START",
});

export const createCastSuccess = (cast) => ({
  type: "CREATE_CAST_SUCCESS",
  payload: cast,
});

export const createCastFailure = () => ({
  type: "CREATE_CAST_FAILURE",
});
// UPDATE MOVIE
export const updateCastStart = () => ({
  type: "UPDATE_CAST_START",
});

export const updateCastSuccess = (cast) => ({
  type: "UPDATE_CAST_SUCCESS",
  payload: cast,
});

export const updateCastFailure = () => ({
  type: "UPDATE_CAST_FAILURE",
});
