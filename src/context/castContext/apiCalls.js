import axios from "axios";
import {
  createCastFailure,
  createCastStart,
  createCastSuccess,
  deleteCastFailure,
  deleteCastStart,
  deleteCastSuccess,
  getCastsFailure,
  getCastsStart,
  getCastsSuccess,
  updateCastStart,
  updateCastSuccess,
  updateCastFailure,
} from "./CastActions";
import { API_URL } from "../../config";

// GET MOVIES
export const getCasts = async (dispatch) => {
  dispatch(getCastsStart());
  try {
    const res = await axios.get(`${API_URL}casts`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getCastsSuccess(res.data));
  } catch (err) {
    dispatch(getCastsFailure());
  }
};
// DELETE MOVIE
export const deleteCast = async (id, dispatch) => {
  dispatch(deleteCastStart());
  try {
    await axios.delete(`${API_URL}casts/` + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteCastSuccess(id));
  } catch (err) {
    dispatch(deleteCastFailure());
  }
};
// ADD MOVIE
export const createCast = async (cast, dispatch) => {
  dispatch(createCastStart());
  try {
    const res = await axios.post(`${API_URL}casts/`, cast, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createCastSuccess(res.data));
  } catch (err) {
    dispatch(createCastFailure());
  }
};
// UPDATE MOVIE
export const updateCast = async (id, cast, dispatch) => {
  dispatch(updateCastStart());
  try {
    const res = await axios.put(`${API_URL}casts/` + id, cast, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateCastSuccess(res.data));
  } catch (err) {
    dispatch(updateCastFailure());
  }
};
