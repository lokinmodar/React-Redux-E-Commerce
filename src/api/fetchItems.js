import items from './mockItems';
import R from 'ramda';
import request from 'superagent';
import mockCategories from './mockCategories';

export const fetchItems = async () =>{
    return new Promise(resolve =>{
        resolve(items);
    });

    // const {body} = await request.get('http://www.mocky.io/v2/5918b9461200001f1040dbeb');
    // return body.items;
};

export const loadMore = async ({offset}) => {
    return new Promise((resolve)=>{
        resolve(items);
    });
};

export const fetchItemById = async id=>{
    return new Promise((resolve,reject)=>{
        console.log("Id in api fetchItems " , id);
        const item = R.find(R.propEq('id',id),items);
        resolve(item);
    });
};

export const fetchCategories = async ()=>{
    return new Promise(resolve =>{
        resolve(mockCategories);
    });
}