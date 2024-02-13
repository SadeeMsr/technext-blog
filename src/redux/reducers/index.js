import { combineReducers } from "redux";
import { blogReducer } from "./blogs.slice";

const reducers = combineReducers({
  allBlogs: blogReducer
});

export default reducers;