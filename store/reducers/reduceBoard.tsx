// Store/Reducers/favoriteReducer.js

import Board from "../../Board"

const initialState = { board: new Board() }

function toggleFavorite(state = initialState, action) { //action.type, action.value
    let nextState
    switch (action.type) {
        case 'CLICK_CELL':
            let nextBoard = state.board

            nextState = {
                ...state,
                board: nextBoard
            }

            return nextState || state
        default:
            return state
    }
}




export default toggleFavorite