
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/womansFash.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addToCart, productDetail  } from '../redux/action/action';


const clampStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    fontSize: '16px',
    fontWeight: '600',
    color:"black"
};

const CategoryclampStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    fontSize: '15px',
    fontWeight: '400',
    color:"#908e91"
};



function BestSelling() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.product);
    const bestSellingProducts = products.filter((item) => item.rating.rate >= 4.5);


    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleProductDetail = (productDetails) => {
        dispatch(productDetail(productDetails));
    };



  return (
    <>
      <div className='d-md-flex container-fluid p-0'>
        <div className='container p-0'>
          <div className='row caroselRow p-0 m-0'>
            <div className=" col-12 pt-lg-4 p-0">
              <div className='row justify-content-center'>
              <h4 className='text-center'>Best Selling collections</h4>
                {bestSellingProducts.map((item) => (
                  <div className='col-md-3 col-sm-6 col-12 mb-4 bestSellingProductCard' key={item.id}>
                    <Link to="/productDetail" onClick={() => handleProductDetail(item)} style={{ overflow: "hidden", textDecoration: "none" }}>
                      <div style={{ overflow: "hidden" }}>
                        <img className='HomeCardImg' src={item.image} alt={item.title} loading="lazy"/>
                      </div>
                    </Link>
                    <div className="mt-2 text-center">
                      <p className="text-center p-0 m-0 " style={clampStyle}>
                        {item.title}
                      </p>
                      <p className="text-center p-0 m-0 homeCardText" style={CategoryclampStyle}>
                        {item.category}
                      </p>
                      <p className="text-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                        Price: <span className="text-success"> ₹{item.price}</span>
                      </p>
                      <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                        Rating: <span style={{ color: "#fc530a" }}>{item.rating.rate}</span>
                      </p>
                      <button className='AddToCartBtn' size="small" style={{ fontSize: '15px' }} onClick={() => handleAddToCart(item)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestSelling;
