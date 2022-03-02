import Axios from "axios";
import {
  ADD_WISHLIST_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_SUCCESS,
  ADD_CART_REQUEST,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_SUCCESS,
  EDIT_ADDRESS_REQUEST,
  EDIT_ADDRESS_SUCCESS,
  EDIT_ADDRESS_FAIL,
  CHANGE_PROFILE_REQUEST,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
} from "../constants/userConstants";
var api_ur = "https://expenditure-tracker-api.herokuapp.com/api/";
// api_ur = "http://localhost:6002/api/";

export const register = (fullName, password, email) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { fullName, password, email },
  });
  try {
    const { data } = await Axios.post(`${api_ur}v1/users/register`, {
      fullName,
      password,
      email,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    await udpateLocalStroage();
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_REGISTER_FAIL,
      error: error.response.data.message,
      payload: { message: error.response.data.message, status: error.status },
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${api_ur}v1/users/login`, {
      email,
      password,
    });
    localStorage.setItem(
      "expenditure-tracker-userInfo",
      JSON.stringify(data.data)
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("expenditure-tracker-userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const addWishlist = (productId) => async (dispatch, getState) => {
  dispatch({ type: ADD_WISHLIST_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.post(
      "/api/users/add-wishlist",
      {
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (data.status === 201) {
      if (user.wishlist.includes(productId)) {
        let index = user.wishlist.indexOf(productId);
        if (index > -1) {
          user.wishlist.splice(index, 1);
        }
      } else {
        user.wishlist.push(productId);
      }
    }
    localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
    dispatch({ type: ADD_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_WISHLIST_FAIL, payload: error.message });
  }
};

export const addToCart = (productId, counter) => async (dispatch, getState) => {
  if (counter === 1) {
    dispatch({ type: ADD_CART_REQUEST });
    try {
      const {
        userLogin: { user },
      } = getState();
      if (user) {
        let data;
        if (user.cartItems) {
          if (user.cartItems.some((cart) => cart.productId === productId)) {
            const index = user.cartItems.findIndex(
              (cart) => cart.productId === productId
            );
            user.cartItems[index].qty = user.cartItems[index].qty + 1;
          } else {
            data = { productId, qty: 1 };
            user.cartItems.push(data);
          }
        } else {
          user.cartItems = [];
          data = { productId, qty: 1 };
          user.cartItems.push(data);
        }
        await Axios.post(
          "/api/users/add-to-cart",
          {
            cartItems: user.cartItems,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
        dispatch({ type: ADD_CART_SUCCESS, payload: user });
      } else {
        const cartItems = localStorage.getItem("thevickyk.com-cartItems")
          ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
          : null;
        if (cartItems) {
          if (cartItems.some((cart) => cart.productId === productId)) {
            const index = cartItems.findIndex(
              (cart) => cart.productId === productId
            );
            cartItems[index].qty = cartItems[index].qty + 1;
          } else {
            let data = { productId, qty: 1 };
            cartItems.push(data);
          }
          localStorage.setItem(
            "thevickyk.com-cartItems",
            JSON.stringify(cartItems)
          );
        } else {
          let cartItems = [];
          let data = { productId, qty: 1 };
          cartItems.push(data);
          localStorage.setItem(
            "thevickyk.com-cartItems",
            JSON.stringify(cartItems)
          );
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_CART_FAIL, error: error.response.data.message });
    }
  }
};

export const addnewAddress =
  (fullName, number, pinCode, state, city, houseNumber, roadName) =>
  async (dispatch, getState) => {
    dispatch({ type: ADD_ADDRESS_REQUEST });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        "/api/users/add-address",
        {
          fullName,
          number,
          pinCode,
          state,
          city,
          houseNumber,
          roadName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      user.address = data.address;
      localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
      dispatch({ type: ADD_ADDRESS_SUCCESS, payload: user });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_ADDRESS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteAddress = (index) => async (dispatch, getState) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();
    if (user.address) {
      user.address.splice(index, 1);
      const { data } = await Axios.post(
        "/api/users/delete-address",
        { index },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (data) {
        localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: user });
      }
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editAddress =
  (fullName, number, pinCode, state, city, houseNumber, roadName, index) =>
  async (dispatch, getState) => {
    dispatch({ type: EDIT_ADDRESS_REQUEST });
    try {
      const {
        userLogin: { user },
      } = getState();
      const { data } = await Axios.post(
        "/api/users/edit-address",
        {
          fullName,
          number,
          pinCode,
          state,
          city,
          houseNumber,
          roadName,
          index,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      user.address = data.address;
      localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
      dispatch({ type: EDIT_ADDRESS_SUCCESS, payload: user });
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_ADDRESS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const changeNameNumber =
  (name, number) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_PROFILE_REQUEST });
    try {
      const {
        userLogin: { user },
      } = getState();
      await Axios.post(
        "/api/users/update-personal-detail",
        {
          name,
          number,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (name) {
        user.name = name;
      }
      if (number) {
        user.number = number;
      }

      localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(user));
      dispatch({ type: CHANGE_PROFILE_SUCCESS, payload: user });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CHANGE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const loginWithFacebook = (accessToken, userID) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { accessToken, userID } });
  try {
    const { data } = await Axios.post("/api/users/login-with-facebook", {
      accessToken,
      userID,
    });
    const cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
    if (cartItems) {
      if (!data.cartItems.length) {
        data.cartItems = cartItems;
      } else {
        data.cartItems.forEach((element, index1) => {
          cartItems.forEach((product, index2) => {
            if (element.productId === product.productId) {
              data.cartItems[index1].qty = product.qty + element.qty;
              cartItems.splice(index2, 1);
            } else {
              data.cartItems.push(product);
              cartItems.splice(index2, 1);
            }
          });
        });
      }
    }
    await Axios.post(
      "/api/users/add-to-cart",
      {
        cartItems: data.cartItems,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(data));
    localStorage.removeItem("thevickyk.com-cartItems");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loginWithGoogle = (tokenId) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { tokenId } });
  try {
    const { data } = await Axios.post("/api/users/login-with-google", {
      tokenId,
    });
    const cartItems = localStorage.getItem("thevickyk.com-cartItems")
      ? JSON.parse(localStorage.getItem("thevickyk.com-cartItems"))
      : null;
    if (cartItems) {
      if (!data.cartItems.length) {
        data.cartItems = cartItems;
      } else {
        data.cartItems.forEach((element, index1) => {
          cartItems.forEach((product, index2) => {
            if (element.productId === product.productId) {
              data.cartItems[index1].qty = product.qty + element.qty;
              cartItems.splice(index2, 1);
            } else {
              data.cartItems.push(product);
              cartItems.splice(index2, 1);
            }
          });
        });
      }
    }
    await Axios.post(
      "/api/users/add-to-cart",
      {
        cartItems: data.cartItems,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    localStorage.setItem("thevickyk.com-userInfo", JSON.stringify(data));
    localStorage.removeItem("thevickyk.com-cartItems");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

const udpateLocalStroage = () => {
  let PendingTask = localStorage.getItem("pendingTask")
    ? JSON.parse(localStorage.getItem("pendingTask"))
    : [];
  PendingTask = PendingTask.filter((data) => {
    return data.api !== "userRegister";
  });
  localStorage.setItem("pendingTask", JSON.stringify(PendingTask));
};

export const getUserList = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_LIST_REQUEST,
    payload: [],
  });
  try {
    const {
      userLogin: { user },
    } = getState();
    const { data } = await Axios.get(
      `${api_ur}v1/users/get-user-list?groupId=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch({
      type: GET_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_USER_LIST_FAIL,
      error: error.response.data.message,
      payload: { message: error.response.data.message, status: error.status },
    });
  }
};
