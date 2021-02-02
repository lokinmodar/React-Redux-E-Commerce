import R from 'ramda';


export const getItemsById = (state,id)=>R.prop(id,state.item);


export const getItems = (state,ownProps)=>{

    const activeCategoryId = getActiveCategoryId(ownProps);

    const applyCategory = (item)=>{

        return R.equals(
            activeCategoryId,
            R.prop('categoryId',item)
        );
    };
    const applySearch = (item)=>{
        return R.contains(
            state.ItemsPage.search,
            R.prop('name',item)
        )
    };
    const items = R.compose(
        R.filter(applySearch),
        R.when(R.always(activeCategoryId), R.filter(applyCategory)),
        R.map(id=>getItemsById(state,id))
    )(state.ItemsPage.ids);
    return items;
};

export const getRenderedItemsLength = state => R.length(state.ItemsPage.ids);

export const getTotalBasketPrice = state=>{
    
    const items = R.map(id=>getItemsById(state,id),state.Basket);
    // console.log("Items are " , items);
    let total = 0;
    return items.reduce((total,item)=>{
        return total + item.price;
    }, total);
    // console.log("Item total is ", phnTotal);
};

export const getTotalBasketCount = state=>{
    return state.Basket.length;
};

export const getCategories = (state)=>{
    // console.log(" fething categories from state " ,R.values(state.Categories));
    return R.values(state.Categories);
};

export const getActiveCategoryId = ownProps=>{
    // console.log("ownProps " , ownProps);
    return R.path(['params','id'],ownProps);
};

export const getBasketItemsWithCount = (state)=>{
    const uniqueIds = R.uniq(state.Basket);

    const itemCount = (id)=>{
        return(
            R.compose(
                R.length,
                R.filter(basketId => R.equals(id,basketId))
            )(state.Basket)
        );
    };
    const itemWithCount = (item)=>{
        return R.assoc('count',itemCount(item.id),item);
    };
    const items = R.compose(
        R.map(itemWithCount),
        R.map(id => getItemsById(state,id))
    )(uniqueIds);
    console.log("Items in basket are ", items);
    return items;
};

