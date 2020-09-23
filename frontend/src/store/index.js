import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);