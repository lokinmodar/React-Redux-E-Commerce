import React from 'react';
import {connect} from 'react-redux';
import { getTotalBasketPrice,getBasketItemsWithCount } from '../selectors/Items';
import R from 'ramda';
import {removeItemFromBasket,cleanBasket,basketCheckout} from '../actions/Items';
import {Link} from 'react-router';

const Basket = ({items,totalPrice,
                removeItemFromBasket,cleanBasket,
                basketCheckout})=>{
    // console.log(items);
    // console.log(totalPrice);
    const isBasketEmpty = R.isEmpty(items);
    const renderContent = () => {
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <tbody>
                            {items.map((item,index)=>(
                                <tr key={index}
                                    className="item-checout">
                                    <td className="first-column-checkout">
                                        <img className="img-thumbnail"
                                            src={item.image}
                                            alt={item.name}  
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <span className="delete-cart"
                                        onClick={()=>removeItemFromBasket(item.id)}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    R.not(isBasketEmpty) &&
                    <div className="row">
                        <div className="pull-right total-user-checkout">
                            <b>Total:</b>
                            ${totalPrice}
                        </div>
                    </div>
                }
            </div>
            )
        };

        const renderSidebar = ()=>{
            return(
                <div>   
                    <Link
                        className="btn btn-info"
                        to="/"
                    >
                    <span className="glyphicon glyphicon-info-sign"/>
                    <span> Continue Shopping</span>
                    </Link>
                    {
                        R.not(isBasketEmpty) &&
                        <div>
                            <button className="btn btn-danger"
                                    onClick={()=>cleanBasket()}        
                            >
                            <span className="glyphicon glyphicon-trash"/>
                            Clean Cart
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={()=>basketCheckout(items)}
                            >
                            <span className="glyphicon glyphicon-envelope"/>
                            Checkout
                            </button>
                        </div>
                    }
                </div>
            );
        };

    return(
        <div className="view-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {renderContent()}
                    </div>
                    <div className="col-md-3 btn-user-checkout">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    );
    };


const mapStateToProps = (state)=>({
    items: getBasketItemsWithCount(state),
    totalPrice: getTotalBasketPrice(state)
});

const mapDispatchToProps = (dispatch)=>({
    removeItemFromBasket: (id)=>dispatch(removeItemFromBasket(id)),
    cleanBasket: ()=>dispatch(cleanBasket()),
    basketCheckout: (items)=>dispatch(basketCheckout(items))
});

export default connect(mapStateToProps,mapDispatchToProps)(Basket);