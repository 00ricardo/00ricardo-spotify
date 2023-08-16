import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import spotifyReducer from './reducers/spotifyReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: spotifyReducer,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
