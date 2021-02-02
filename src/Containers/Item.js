import React from 'react';
import {connect} from 'react-redux';
import {fetchItemById,addItemToBasket} from '../actions/Items';
import {getItemsById} from '../selectors/Items';
import R from 'ramda';
import BasketCart  from './BasketCart';
import {Link} from 'react-router';


class Item extends React.Component{

    componentDidMount = () => this.props.fetchItemById(this.props.params.id);

    renderFields = ()=>{
        const {item} = this.props;
        const columnFields = R.compose(
            R.toPairs,
            R.pick([
                'color',
                'fabric',
                'size',
                'type'
            ])
        )(item);
        
        return columnFields.map(([key,value])=>{
            return(
                <div className='column' key={key}>
                    <div className='ab-details-title'>
                        <p> { key } </p>
                    </div>
                    <div className='ab-details-info'>
                        <p> { value } </p>
                    </div>
                </div>
            );
           
        });
    };

    renderContent = ()=>{
        const {item} = this.props;
        return(
            <div>
                <div className='thumbnail'>
                    <div className="col-md-6">
                        <img className='img-thumbnail'
                            src={item.image}
                            alt={item.name}
                        />

                    </div>
                    <div className="col-md-6">
                        {this.renderFields()}
                    </div>
                </div>
                <div className='caption-full'>
                    <h4 className='pull-right'>
                        ${item.price}
                    </h4>
                    <h4>
                        {item.name}
                    </h4>
                    <p>
                        {item.description}
                    </p>
                </div>
            </div>
        );
    };

    renderSideBar = ()=>{
        
        const {item,addItemToBasket} = this.props;
        return(
            <div>
               <div>
                    <p className ='lead'> Quick Shop</p>
                    <BasketCart />
                    <div className='form-group'>
                        <h1>{item.name}</h1>
                        <h2>{item.price}</h2>
                    </div>
               </div>
               <Link to="/"
                    className="btn btn-info btn-block">
                    Back to Store
                </Link>
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={()=>addItemToBasket(item.id)}>
                    Add To Cart
                </button>
            </div>
        );
    };

    render(){
        // console.log(this.props.item);
        const {item} = this.props;
        return(
            <div className='view-container'>
                <div className='container'>
                    <div className='col-md-9'>
                        {item && this.renderContent()}
                    </div>
                    <div className='col-md-3'>
                        {item && this.renderSideBar()}
                    </div>
                </div>
            </div>
        );
    }
}

// export default Item;
const mapDispatchtoProps = (dispatch)=>({
    fetchItemById: (id)=>{dispatch(fetchItemById(id))},
    addItemToBasket: (id)=>{dispatch(addItemToBasket(id))}
});

const mapStateToProps = (state)=>({
    item: getItemsById(state,state.ItemPage.id)
});

export default connect(mapStateToProps,mapDispatchtoProps)(Item);