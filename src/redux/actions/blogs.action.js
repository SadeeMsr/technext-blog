import axios from "axios";
import { BlogActionTypes } from "../types/blogsAction.type";


export const fetchBlogs = () => async (dispatch) => {
    const response = await axios.get("/api/blog");
    dispatch({ type: BlogActionTypes.FETCH_BLOGS, payload: response.data });
  };
  