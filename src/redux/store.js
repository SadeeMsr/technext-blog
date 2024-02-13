import reducers from "./reducers";

const { createStore, applyMiddleware } = require("redux");
const { thunk } = require("redux-thunk");




const store = createStore(reducers, applyMiddleware(thunk));

export default store;
