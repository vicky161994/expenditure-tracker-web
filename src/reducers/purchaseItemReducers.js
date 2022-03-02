import {
  CREATE_ITEM_LIST_FAIL,
  CREATE_ITEM_LIST_REQUEST,
} from "../constants/itemListConstant";
import {
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
  UPDATE_PURCHASE_ITEM_SUCCESS,
} from "../constants/purchaseItemConstant";

export const getPurchaseItemListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PURCHASE_ITEM_REQUEST:
      return { loading: true };
    case GET_PURCHASE_ITEM_SUCCESS:
      return { loading: false, purchaseItemList: action.payload };
    case GET_PURCHASE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ITEM_LIST_REQUEST:
      return { loading: true };
    case CREATE_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPurchaseItemDetailsByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_ITEM_DETAIL_REQUEST:
      return { loading: true };
    case PURCHASE_ITEM_DETAIL_SUCCESS:
      return { loading: false, purchaseItemDetail: action.payload };
    case PURCHASE_ITEM_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePurchaseItemDetailsByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PURCHASE_ITEM_REQUEST:
      return { loading: true };
    case UPDATE_PURCHASE_ITEM_SUCCESS:
      return { loading: false, error: action.payload };
    case UPDATE_PURCHASE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePurchaseItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PURCHASE_ITEM_REQUEST:
      return { loading: true };
    case DELETE_PURCHASE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
