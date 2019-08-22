import { combineReducers } from "redux";

import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import uiReducer from "./uiReducer";


export default combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
});