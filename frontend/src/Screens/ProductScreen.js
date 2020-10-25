import React from 'react';
import {Link} from 'react-router-dom';
import data from '../data';

function ProductScreen (props){
    console.log(props.match.params.id);

    const product = data.products.find(product => product._id === props.match.params.id);

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product_image"/>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews})
                    </li>
                    <li>
                        Price: <b>${product.price} </b>
                    </li>
                    <li>
                        Description:
                        <div>
                            {product.desc}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.status}
                    </li>
                    <li>
                        Qty: <select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                        </select>
                    </li>
                    <li>
                        <button className="button-prm button-linear-grd">
                            {/* To be improved Checkout Icon */}
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default ProductScreen;