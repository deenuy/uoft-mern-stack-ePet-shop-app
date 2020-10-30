import React, { useState, useEffect } from 'react';
// import data from '../data'; /* Static Data object */
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen (props){
  // Add hooks
  // const [products, setProduct] = useState([]);
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts())

    // const fetchData = async () => {
    //   const {data} = await axios.get("api/products");
    //   setProduct(data);
    //   console.log(data);
    // }
    
    // fetchData();

    return () => {
      // 
    }
  }, [])

  return loading? <div>Loading...</div> : 
    error? <div>{error}</div> :
      <ul className="products">
            {
              products.map(product => 
                // To get the li with unique key product id
                <li key={product._id}>
                  <div className="product">
                      <Link to={"/product/" + product._id}>
                          <img className="product-image" src={product.image} alt="product_image"/>
                      </Link>
                      <div className="product-name">
                          <Link to={"/product/" + product._id}>{product.name}</Link>
                      </div>
                      <div className="product-brand">{product.brand}</div>
                      <div className="product-price">{product.price}</div>
                      <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
                  </div>
                </li>
              )
            }            
          </ul>
}

export default HomeScreen;