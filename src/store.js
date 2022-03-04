import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  getUserListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  getItemDetailsByIdReducer,
  getItemListReducer,
} from "./reducers/itemListReducers";
import {
  getPurchaseItemDetailsByIdReducer,
  getPurchaseItemListReducer,
} from "./reducers/purchaseItemReducers";
const initialState = {
  userLogin: {
    user: localStorage.getItem("expenditure-tracker-userInfo")
      ? JSON.parse(localStorage.getItem("expenditure-tracker-userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  itemList: getItemListReducer,
  itemDetail: getItemDetailsByIdReducer,
  purchaseItemList: getPurchaseItemListReducer,
  purchaseItemDetail: getPurchaseItemDetailsByIdReducer,
  userList: getUserListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
