import Axios from "axios";
import {
  CREATE_ITEM_LIST_FAIL,
  CREATE_ITEM_LIST_REQUEST,
  DELETE_ITEM_LIST_FAIL,
  GET_ITEM_LIST_FAIL,
  GET_ITEM_LIST_REQUEST,
  GET_ITEM_LIST_SUCCESS,
  ITEM_LIST_DETAIL_FAIL,
  ITEM_LIST_DETAIL_REQUEST,
  ITEM_LIST_DETAIL_SUCCESS,
  UPDATE_ITEM_LIST_FAIL,
  UPDATE_ITEM_LIST_REQUEST,
} from "../constants/itemListConstant";
var api_ur = "https://expenditure-tracker-api.herokuapp.com/api/";
// api_ur = "http://localhost:6002/api/";

export const getItemList = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: GET_ITEM_LIST_REQUEST,
    payload: [],
  });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.get(`${api_ur}v1/items?groupId=${groupId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: GET_ITEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_ITEM_LIST_FAIL,
      error: error.response.data.message,
      payload: { message: error.response.data.message, status: error.status },
    });
  }
};

export const getItemDetailsById = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: ITEM_LIST_DETAIL_REQUEST,
    payload: [],
  });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.get(`${api_ur}v1/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: ITEM_LIST_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ITEM_LIST_DETAIL_FAIL,
      error: error.response.data.message,
      payload: { message: error.response.data.message, status: error.status },
    });
  }
};

export const updateItemDetailsById =
  (updatedata, itemId, groupId) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_ITEM_LIST_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        `${api_ur}v1/items/${itemId}`,
        { name: updatedata.name, unit: updatedata.unit },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data) {
        const { data } = await Axios.get(
          `${api_ur}v1/items?groupId=${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({
          type: GET_ITEM_LIST_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: UPDATE_ITEM_LIST_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

export const createItem =
  (createdata, groupId) => async (dispatch, getState) => {
    dispatch({
      type: CREATE_ITEM_LIST_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        `${api_ur}v1/items`,
        { name: createdata.name, unit: createdata.unit, groupId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data) {
        const { data } = await Axios.get(
          `${api_ur}v1/items?groupId=${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({
          type: GET_ITEM_LIST_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: CREATE_ITEM_LIST_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

export const deleteItem = (itemId, groupId) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ITEM_LIST_REQUEST,
    payload: [],
  });
  try {
    console.log(groupId);
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.delete(`${api_ur}v1/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (data) {
      const { data } = await Axios.get(`${api_ur}v1/items?groupId=${groupId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({
        type: GET_ITEM_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: DELETE_ITEM_LIST_FAIL,
      error: error.response.data.message,
      payload: { message: error.response.data.message, status: error.status },
    });
  }
};
