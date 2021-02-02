import R from 'ramda';


const itemInitialState = {};

export default (state=itemInitialState, action)=>{
    switch(action.type) {
        case 'FETCH_ITEM_SUCCESS' :
        {
            const newValue = R.indexBy(R.prop('id'),action.payload);
            return R.merge(state,newValue);
        }
        case 'LOAD_MORE_SUCCESS' :
        {
            const moreValues = R.indexBy(R.prop('id'),action.payload);
            return R.merge(state,moreValues);
        }
        case 'FETCH_ITEM_BY_ID_SUCCESS' :
        {
            return R.assoc(action.payload.id,action.payload,state);
        }
        default:
            return state;
    }};