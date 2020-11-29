// Store/configureStore.js

import { createStore } from 'redux';
import updateReduxClickOnBoard from './board/reducer'

export default createStore(updateReduxClickOnBoard)