import {fetchItems as fetchItemsApi,
        loadMore as loadMoreApi,
        fetchItemById as fetchItemsByIdApi,
        fetchCategories  as fetchCategoriesApi}  from '../api/fetchItems';
import {getRenderedItemsLength} from '../selectors/Items';

export const fetchItems = ()=>{
    
    return async (dispatch) => {
        try{
            dispatch({
                type: 'FETCH_ITEM_START'
            });
            const items = await fetchItemsApi();
            dispatch({
                type: 'FETCH_ITEM_SUCCESS',
                payload: items
            });
        }catch(err){
            dispatch({
                type: 'FETCH_ITEM_FAIL',
                payload: err,
                error: true
            });
        };
    };
};

export const fetchCategories = ()=>{
    
    return async (dispatch,getState)=>{
        // console.log("Fetching entire state ", getState());
        try{
            dispatch({
                type: 'FETCH_CATEGORIES_START'
            });
            const categories = await fetchCategoriesApi();
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                payload: categories
            });
        }catch(err){
            dispatch({
                type: 'FETCH_CATEGORIES_FAILURE',
                payload: err,
                error: true
            });
        };
    };
}; 

export const loadMore = ()=>{
    
    return async (dispatch,getState) => {
        const offset = getRenderedItemsLength(getState());
        try{
            dispatch({
                type: 'LOAD_MORE_START'
            });
            const items = await loadMoreApi({offset});
            dispatch({
                type: 'LOAD_MORE_SUCCESS',
                payload: items
            });
        }catch(err){
            dispatch({
                type: 'LOAD_MORE_FAILURE',
                payload: err,
                error: true
            });
        };
    };
};

export const fetchItemById = id=>{
    return async (dispatch,getState) => {
        const offset = getRenderedItemsLength(getState());
        try{
            dispatch({
                type: 'FETCH_ITEM_BY_ID_START'
            });
            const item = await fetchItemsByIdApi(id);
            dispatch({
                type: 'FETCH_ITEM_BY_ID_SUCCESS',
                payload: item
            });
        }catch(err){
            dispatch({
                type: 'FETCH_ITEM_BY_ID_FAILURE',
                payload: err,
                error: true
            });
        };
    };
};

export const addItemToBasket = id => dispatch => {
    dispatch({
        type: 'ADD_ITEM_TO_BASKET',
        payload: id
    });
};

export const searchItem = text => dispatch =>{
    console.log("searching ", text);
    dispatch({
        type: 'SEARCH_ITEM',
        payload: text
    })};

export const removeItemFromBasket = (id)=> async dispatch =>{
    dispatch({
        type: 'REMOVE_ITEM_FROM_BASKET',
        payload: id
    });
};   

export const cleanBasket = ()=>dispatch => {
    dispatch({
        type: 'CLEAN_BASKET'
    });
};

export const basketCheckout = (items)=> () =>{
    alert(JSON.stringify(items));
};