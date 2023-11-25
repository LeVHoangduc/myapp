import { legacy_createStore } from "redux";
import rootReducer from "./reducers/root";
const store = legacy_createStore(rootReducer);
export default store;