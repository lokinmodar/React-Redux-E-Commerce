import React from 'react';
import {connect} from 'react-redux';
import {fetchItems,fetchCategories} from '../actions/Items';
import {getItems} from '../selectors/Items';
import {Link} from 'react-router';
import R from 'ramda';
import {loadMore,addItemToBasket} from '../actions/Items';

class Items extends React.Component{

    componentDidMount(){
        this.props.fetchItems();
        this.props.fetchCategories();
    }

    renderItem = (item,index)=>{
        const {addItemToBasket} = this.props;
        const shortDesc = `${R.take(60,item.description)}...`;
        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className="thumbnail">
                    <img className='img-thumbnail'
                        src={item.image}
                        alt={item.name}
                    />
                </div>
                <div className="caption">
                    <h4 className="pull-right">
                        ${item.price}
                    </h4>
                    <h4>
                        <Link to={`./Items/${item.id}`}>
                            {item.name}
                        </Link>
                    </h4>
                    <p> {shortDesc}</p>
                    <p className='itemButton'>
                        <button className="btn btn-primary"
                                onClick={()=>addItemToBasket(item.id)}>
                            Buy Now
                        </button>
                        <Link to={`/Items/${item.id}`}
                            className="btn btn-default">
                            More Info
                        </Link>
                    </p>
                </div>
            </div>
        );
    };

    render(){
        const {items,loadMore} = this.props;
        return(
        <div>
            <div className="books row">
                {items.map((item,index)=>{
                    return this.renderItem(item,index);
                })}
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="pull-right btn btn-primary"
                            onClick={loadMore}>
                        Load More
                    </button>
                </div>

            </div>
        </div>            
       
        )};
};

const mapDispatchToProps = (dispatch)=>({
    fetchItems: ()=>dispatch(fetchItems()),
    loadMore: ()=>dispatch(loadMore()),
    addItemToBasket: (id)=>dispatch(addItemToBasket(id)),
    fetchCategories: ()=>dispatch(fetchCategories())
});
//ownProps are available here because this component is defined directly on route.
//child componenets must include compose withRoutes
const mapStateToProps = (state,ownProps)=>({
    items: getItems(state,ownProps)
});

export default connect(mapStateToProps,mapDispatchToProps)(Items);