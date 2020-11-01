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
    // Home screen container
    <div className="homescreen-container" >
      <div className="filter">
        <ul className="list-unstyled list-inline row">
          <li className="col-2 col-4-sm text-center">
            <div>
              <a href="">
              <img className="filter-pet" src="/imgs/shop-by-dog.jpg" alt="Dog"/>
              </a>
            </div>
            <p className="filter-name">Dog</p>
          </li>
          <li className="col-2 col-4-sm text-center">
            <div>
              <a href="">
              <img className="filter-pet" src="/imgs/shop-by-cat.jpg" alt="Cat"/>
              </a>
            </div>
            <p className="filter-name">Cat</p>
          </li>
          <li className="col-2 col-4-sm text-center">
            <div>
              <a href="">
              <img className="filter-pet" src="/imgs/shop-by-fish.jpg" alt="Fish"/>
              </a>
            </div>
            <p className="filter-name">Fish</p>
          </li>
          <li className="col-2 col-4-sm text-center">
            <div>
              <a href="">
              <img className="filter-pet" src="/imgs/shop-by-small-pet.jpg" alt="Small Pet"/>
              </a>
            </div>
            <p className="filter-name">Small Pet</p>
          </li>
          <li className="col-2 col-4-sm text-center">
            <div>
              <a href="">
              <img className="filter-pet" src="/imgs/shop-by-reptile.jpg" alt="Reptile"/>
              </a>
            </div>
            <p className="filter-name">Reptile</p>
          </li>
          <li className="col-2 col-4-sm text-center">
            <div>
              <a href="">
              <img className="filter-pet" src="/imgs/shop-by-bird.jpg" alt="Bird"/>
              </a>
            </div>
            <p className="filter-name">Bird</p>
          </li>
        </ul>
      </div>
      <div className="product-container">
        <p className="product-results">1 - 48 of 5606 results</p>
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
                  <Link to={"/product/" + product._id}>
                  {product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
              </div>
            </li>
            )
          }            
        </ul>
      </div>
    </div>
}

export default HomeScreen;