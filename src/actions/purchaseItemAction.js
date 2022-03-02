import Axios from "axios";
import {
  CREATE_PURCHASE_ITEM_FAIL,
  CREATE_PURCHASE_ITEM_REQUEST,
  DELETE_PURCHASE_ITEM_FAIL,
  DELETE_PURCHASE_ITEM_REQUEST,
  GET_PURCHASE_ITEM_FAIL,
  GET_PURCHASE_ITEM_REQUEST,
  GET_PURCHASE_ITEM_SUCCESS,
  PURCHASE_ITEM_DETAIL_FAIL,
  PURCHASE_ITEM_DETAIL_REQUEST,
  PURCHASE_ITEM_DETAIL_SUCCESS,
  UPDATE_PURCHASE_ITEM_FAIL,
  UPDATE_PURCHASE_ITEM_REQUEST,
} from "../constants/purchaseItemConstant";
var api_ur = "https://expenditure-tracker-api.herokuapp.com/api/";
api_ur = "http://localhost:6002/api/";

export const getPurchaseItemList =
  (groupId, page, filterData) => async (dispatch, getState) => {
    dispatch({
      type: GET_PURCHASE_ITEM_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.get(
        `${api_ur}v1/purchase-item?groupId=${groupId}&purchaseStartDate=${filterData.purchaseStartDate}&purhcaseEndDate=${filterData.purhcaseEndDate}&item=${filterData.item}&createdBy=${filterData.createdBy}&billAvailable=${filterData.billAvailable}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: GET_PURCHASE_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: GET_PURCHASE_ITEM_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

export const getPurchaseItemDetailsById =
  (itemId) => async (dispatch, getState) => {
    dispatch({
      type: PURCHASE_ITEM_DETAIL_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.get(`${api_ur}v1/purchase-item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({
        type: PURCHASE_ITEM_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: PURCHASE_ITEM_DETAIL_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

export const updatePurchaseItemDetailsById =
  (updatedata, itemId, groupId) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_PURCHASE_ITEM_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        `${api_ur}v1/purchase-item/${itemId}`,
        {
          purchaseDate: updatedata.purchaseDate,
          purchaseItem: updatedata.name,
          units: updatedata.unit,
          totalCost: updatedata.totalCost,
          billAvailable: updatedata.billAvailbale,
          groupId: groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data) {
        const { data } = await Axios.get(
          `${api_ur}v1/purchase-item?groupId=${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({
          type: GET_PURCHASE_ITEM_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: UPDATE_PURCHASE_ITEM_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

export const createItem =
  (createdata, groupId) => async (dispatch, getState) => {
    dispatch({
      type: CREATE_PURCHASE_ITEM_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        `${api_ur}v1/purchase-item`,
        {
          purchaseDate: createdata.date,
          purchaseItem: createdata.name,
          units: createdata.unit,
          totalCost: createdata.totalCost,
          billAvailable: createdata.billAvailbale,
          groupId: groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data) {
        const { data } = await Axios.get(
          `${api_ur}v1/purchase-item?groupId=${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({
          type: GET_PURCHASE_ITEM_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: CREATE_PURCHASE_ITEM_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

export const deletePurchaseItem =
  (itemId, groupId) => async (dispatch, getState) => {
    dispatch({
      type: DELETE_PURCHASE_ITEM_REQUEST,
      payload: [],
    });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.delete(
        `${api_ur}v1/purchase-item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data) {
        const { data } = await Axios.get(
          `${api_ur}v1/purchase-item?groupId=${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({
          type: GET_PURCHASE_ITEM_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: DELETE_PURCHASE_ITEM_FAIL,
        error: error.response.data.message,
        payload: { message: error.response.data.message, status: error.status },
      });
    }
  };

//
