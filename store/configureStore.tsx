// Store/configureStore.js

import { createStore } from 'redux';
import toggleFavorite from './reducers/reduceBoard'

export default createStore(toggleFavorite)