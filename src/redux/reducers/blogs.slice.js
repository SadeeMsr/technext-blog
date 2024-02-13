import { BlogActionTypes } from "../types/blogsAction.type"

const initialState = {
    blogs: []
}


//(state, action) in parameter
export const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case BlogActionTypes.FETCH_BLOGS:
   
    return {...state, blogs:payload}

  default:
    return state
  }
}
