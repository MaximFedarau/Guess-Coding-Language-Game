import { combineReducers, createStore } from "redux";

function GitHubReducer(state = {data: ''},action) {
    switch(action.type) {
        case "SET":
            return {...state, data: action.data}
        default:
            return state
    }
}

const reducer = combineReducers({GitHubReducer})

const store = createStore(reducer)

export default store