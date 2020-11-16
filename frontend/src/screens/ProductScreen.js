import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import BarMenu from "../components/BarMenu";

function ProductScreen(props) {
    console.log(props.match.params.id);

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    };

    return (
    <div className="homescreen-container" >
        <BarMenu handleCategChange={() => props.history.push('/')}/>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {
            loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                    (
                        <div className="details">
                            <div className="details-image">
                                <img src={product.image} alt="product_image" />
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
                                    <li className="cart-label">
                                        Price: {product.price}
                                    </li>
                                    <li className="cart-label">
                                        Status: {product.status}
                                    </li>
                                    Qty:{' '}
                                    <select
                                        className="cart-label"
                                        value={qty}
                                        onChange={(e) => {
                                            setQty(e.target.value);
                                        }}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <li className="cart-label">
                                        {product.countInStock > 0 && (
                                            <button onClick={handleAddToCart} className="button-prm cart-btn">
                                                Add to Cart
                                            </button>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
        }

    </div>
    )
}

export default ProductScreen;