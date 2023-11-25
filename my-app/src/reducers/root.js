import { combineReducers } from "redux";
import totalCartItem from "./totalCartItem";

const rootReducer = combineReducers({
    totalCartItem: totalCartItem
});
export default rootReducer;