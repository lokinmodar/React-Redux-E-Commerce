import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import itemReducer from '../reducers/item';
import ItemsPage from '../reducers/ItemsPage';
import ItemPage from '../reducers/ItemPage';
import {routerReducer} from 'react-router-redux';
import Basket from '../reducers/Basket';
import Categories from '../reducers/Categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            routing:routerReducer,
            item: itemReducer,
            ItemsPage: ItemsPage,
            ItemPage: ItemPage,
            Basket:Basket,
            Categories: Categories
        }),composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};