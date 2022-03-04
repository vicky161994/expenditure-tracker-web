import {
  ADD_ADDRESS_SUCCESS,
  ADD_CART_SUCCESS,
  EDIT_ADDRESS_SUCCESS,
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADD_CART_SUCCESS:
      return { loading: false, user: action.payload };
    case ADD_ADDRESS_SUCCESS:
      return { loading: false, user: action.payload };
    case EDIT_ADDRESS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getUserListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_LIST_REQUEST:
      return { loading: true };
    case GET_USER_LIST_SUCCESS:
      return { loading: false, userList: action.payload };
    case GET_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
