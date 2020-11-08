import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import {orders} from './reducers'

//code to setup redux dev tools
const composeEnhancers = compose;

const store = createStore(orders, composeEnhancers(
    applyMiddleware(thunk)
));

export default store