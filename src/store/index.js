import { createStore } from "redux";

import reducer from "./reducer";
import state from "./state";
import middleware from "./middleware";


export default createStore(reducer, state, middleware);