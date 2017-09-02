//@flow
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas';
import initState from './initState'

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => ({
    ...createStore(
        rootReducer,
        initState,
        composeWithDevTools(middleware)
    ),
        runSaga: sagaMiddleware.run(rootSaga)

});

export default configureStore();







