import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// import redux here
import rootReducer from './reducers/index';

// middleware thunk
const middleware = [thunk];

// middleware: redux Logger (development only)
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

const persistConfig = {
  key: 'root',                    // root
  storage: AsyncStorage,          // storage
  whitelist: ['songsReducer'],    // reducer to persist
  blacklist: []                   // reducer to exempt
}

// middleware - persisting the persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux - store
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

// middleware: redux persist persister
// const persistor = persistStore(store);

// exports
export {
  store
  // persistor,
};
