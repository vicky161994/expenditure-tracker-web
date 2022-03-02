import {
  CREATE_ITEM_LIST_FAIL,
  CREATE_ITEM_LIST_REQUEST,
  DELETE_ITEM_LIST_FAIL,
  DELETE_ITEM_LIST_REQUEST,
  GET_ITEM_LIST_FAIL,
  GET_ITEM_LIST_REQUEST,
  GET_ITEM_LIST_SUCCESS,
  ITEM_LIST_DETAIL_FAIL,
  ITEM_LIST_DETAIL_REQUEST,
  ITEM_LIST_DETAIL_SUCCESS,
  UPDATE_ITEM_LIST_FAIL,
  UPDATE_ITEM_LIST_REQUEST,
} from "../constants/itemListConstant";

export const getItemListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ITEM_LIST_REQUEST:
      return { loading: true };
    case GET_ITEM_LIST_SUCCESS:
      return { loading: false, itemList: action.payload };
    case GET_ITEM_LIST_FAIL:
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

export const getItemDetailsByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_LIST_DETAIL_REQUEST:
      return { loading: true };
    case ITEM_LIST_DETAIL_SUCCESS:
      return { loading: false, itemDetail: action.payload };
    case ITEM_LIST_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateItemReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ITEM_LIST_REQUEST:
      return { loading: true };
    case UPDATE_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ITEM_LIST_REQUEST:
      return { loading: true };
    case DELETE_ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
