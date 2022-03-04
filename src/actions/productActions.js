import Axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../constants/productConstants";
import {
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
} from "../constants/userConstants";
var api_ur = "https://expenditure-tracker-api.herokuapp.com/api/";
api_ur = "http://localhost:6002/api/";
export const productlist =
  (page, filterKeyword) => async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.get(
        `${api_ur}v1/groups?search=${filterKeyword}&page=${page}&limit=10`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const createGroup = (name) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.post(
      `${api_ur}v1/groups`,
      { name },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (data) {
      const { data } = await Axios.get(
        `${api_ur}v1/groups?page=${1}&limit=10`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const productDetail = (productID) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST });
  try {
    const { data } = await Axios.post(`/api/products/get-product/`, {
      _id: productID,
    });
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const joinGroup = (groupId, page) => async (dispatch, getState) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.post(
      `${api_ur}v1/groups/join-group`,
      { groupId: groupId },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (data) {
      const { data } = await Axios.get(
        `${api_ur}v1/groups?page=${page}&limit=10`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteGroup = (groupId, page) => async (dispatch, getState) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.delete(`${api_ur}v1/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (data) {
      const { data } = await Axios.get(
        `${api_ur}v1/groups?page=${1}&limit=10`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removeGroup = (groupId, page) => async (dispatch, getState) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.post(
      `${api_ur}v1/groups/remove-group`,
      { groupId: groupId },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (data) {
      const { data } = await Axios.get(
        `${api_ur}v1/groups?page=${1}&limit=10`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};
