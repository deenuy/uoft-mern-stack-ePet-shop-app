import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import BarMenu from "../components/BarMenu";

function HomeScreen(props) {

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const [petClass, setPetClass] = useState('');
  const [category, setCategory] = useState('');
  const [filterText, setFilterText] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(petClass, category));
    if (petClass || category) {
      setFilterText(petClass + " " + category);
    } else {
      setFilterText("All Products");
    }
    return () => {
      // 
    }
  }, [petClass, category]);

  const handleCategChange = (categ) => {
    setCategory(categ === "All" ? "": categ);
  };

  const clearFilter = () => {
    setPetClass('');
    setCategory('');
  }

  return loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
      // Home screen container
      <div className="homescreen-container" >
        <BarMenu handleCategChange={handleCategChange} />
        <div className="filter">
          <ul className="list-unstyled list-inline row">
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-filter" onClick={() => setPetClass("Dog")}>
                  <img className="filter-pet" src="/imgs/shop-by-dog.jpg" alt="Dog" />
                </button>
              </div>
              <p className="filter-name">Dog</p>
            </li>
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-filter" onClick={() => setPetClass("Cat")}>
                  <img className="filter-pet" src="/imgs/shop-by-cat.jpg" alt="Cat" />
                </button>
              </div>
              <p className="filter-name">Cat</p>
            </li>
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-filter" onClick={() => setPetClass("Fish")}>
                  <img className="filter-pet" src="/imgs/shop-by-fish.jpg" alt="Fish" />
                </button>
              </div>
              <p className="filter-name">Fish</p>
            </li>
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-filter" onClick={() => setPetClass("Small Pet")}>
                  <img className="filter-pet" src="/imgs/shop-by-small-pet.jpg" alt="Small Pet" />
                </button>
              </div>
              <p className="filter-name">Small Pet</p>
            </li>
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-filter" onClick={() => setPetClass("Reptile")}>
                  <img className="filter-pet" src="/imgs/shop-by-reptile.jpg" alt="Reptile" />
                </button>
              </div>
              <p className="filter-name">Reptile</p>
            </li>
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-filter" onClick={() => setPetClass("Bird")}>
                  <img className="filter-pet" src="/imgs/shop-by-bird.jpg" alt="Bird" />
                </button>
              </div>
              <p className="filter-name">Bird</p>
            </li>
            <li className="col-2 col-4-sm text-center">
              <div>
                <button className="btn-all-filter button-prm" onClick={() => clearFilter()}>
                  Clear Filter
              </button>
              </div>
            </li>
          </ul>
        </div>
        <h1 style={{textAlign: "center"}}>{filterText}</h1>
        <div className="product-container">
          <ul className="products">
            {
              products.map((product) =>
                <li key={product._id}>
                  <div className="product">
                    <Link to={"/product/" + product._id}>
                      <img className="product-image" src={product.image} alt="product_image" />
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