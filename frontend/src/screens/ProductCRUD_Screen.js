import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { saveProduct, deleteProdcut } from '../actions/productCRUD_Actions';
import { listProducts } from '../actions/productActions';
import { Discovery } from 'aws-sdk';
import PaginacionTabla from "../components/PaginacionTabla";
import BarMenu from "../components/BarMenu";

function ProductsCRUD_Screen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [petClass, setPetClass] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPetClass(product.petClass);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        petClass,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="homescreen-container" >
      <BarMenu handleCategChange={() => props.history.push('/')}/>
      <div className="content content-margined">
        {modalVisible && (
          <div className="form">
            <form onSubmit={submitHandler}>
              <ul className="form-container">
                <li>
                  {<h2>Create Product</h2>}
                </li>
                <li>
                  {loadingSave && <div>Loading...</div>}
                  {errorSave && <div>{errorSave}</div>}
                </li>

                <li>
                  <label className="form-label" htmlFor="name">Pet Class</label>
                  <input
                    className="form-input"
                    type="text"
                    name="petClass"
                    value={petClass}
                    id="petClass"
                    onChange={(e) => setPetClass(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label className="form-label" htmlFor="price">Price</label>
                  <input
                    className="form-input"
                    type="text"
                    name="price"
                    value={price}
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label className="form-label" htmlFor="image">Image</label>
                  <input
                    className="form-input"
                    type="text"
                    name="image"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                  ></input>
                  <input type="file" onChange={uploadFileHandler}></input>
                  {uploading && <div>Uploading...</div>}
                </li>
                <li>
                  <label className="form-label" htmlFor="brand">Brand</label>
                  <input
                    className="form-input"
                    type="text"
                    name="brand"
                    value={brand}
                    id="brand"
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label className="form-label" htmlFor="countInStock">CountInStock</label>
                  <input
                    className="form-input"
                    type="text"
                    name="countInStock"
                    value={countInStock}
                    id="countInStock"
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label className="form-label" htmlFor="name">Category</label>
                  <input
                    className="form-input"
                    type="text"
                    name="category"
                    value={category}
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea
                    className="form-input"
                    name="description"
                    value={description}
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </li>
                <div className="form-submit">
                  <button type="submit" className="button-prm btns">
                    {id ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalVisible(false)}
                    className="button-prm btns"
                  >
                    Back
                </button>
                </div>
              </ul>
            </form>
          </div>
        )}

        {products && !modalVisible && (
          <div className="product-list">
            <div className="product-header">
              <h3>Products</h3>
              <button className="button-prm" onClick={() => openModal({})}>
                Create Product
        </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Pet Class</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product) => (
                    <tr key={product._id}>
                      <td><img className="product-thumbnail" src={product.image} alt="" /></td>
                      <td>{product.petClass}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button className="button-prm" onClick={() => openModal(product)}>
                          Edit
                  </button>{' '}
                        <button
                          className="button-prm"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                  </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>)}
      </div>
    </div>
  );
}
export default ProductsCRUD_Screen;
