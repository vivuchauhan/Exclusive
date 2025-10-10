import React, { useState, useEffect } from 'react';
import "./css/product.css";
import "./css/home.css";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, addToCart, productDetail } from '../redux/action/action.js';
import { Link } from 'react-router-dom';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

import WishlistImg from './images/wishlist/wishlist.png';


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

function Wishlist() {

  const wishlist = useSelector((state) => state.product.wishlist);
  console.log('wishlist component', wishlist)
  const dispatch = useDispatch();
  const [localWishlist, setLocalWishlist] = useState(wishlist);
    const [randomOffsets, setRandomOffsets] = useState({});

  const products = useSelector((state) => state.product.product);

  const totalQuantity = localWishlist.length;
  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    setTimeout(() => {
      setLocalWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== productId)
      );
    }, 0);
  };

  useEffect(() => {
    const offsets = {};
    products.forEach(item => {
      offsets[item.id] = Math.floor(Math.random() * 200); // 0–200 random
    });
    setRandomOffsets(offsets);
  }, [products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase()
  );
  console.log("filteredProducts", filteredProducts)
  const handleProductDetail = (productDetails) => {
    dispatch(productDetail(productDetails));
  };

  return (
      <>
        <div className="container-fluid">
          <div className='container d-flex justify-content-center'>
            {localWishlist && localWishlist.length === 0 ? (
              <div className='pt-4'>
                <img src={WishlistImg} alt='wishlistImg' className='img-fluid' loading="lazy"/>
              </div>
            ) : (
              <div className="container">
              <div><h4 className='mt-5'>Wishlist ({totalQuantity})</h4></div>
                <OwlCarousel 
                    className="owl-carousel owl-theme py-lg-4"
                    loop={false}
                    margin={20}
                    nav={true}
                    autoplay={false}
                    dots={false}
                    responsive={{
                      0: {
                        items: 2,
                      },
                      768: {
                        items: 4,
                      },
                      1000: {
                        items: 5,
                      },
                      1400: {
                        items: 6,
                      },
                    }}
                  >
                  {wishlist && wishlist.map((item) => (
                  <div className='item CardStyle my-lg-4 mb-4 wishlistIconCont'  key={item.id}>
                    <div className='discount'>
                      <small> -{Math.ceil(item.discountPercentage)}% OFF</small>
                    </div>
                    <Link className='' to="/productDetail" onClick={() => handleProductDetail(item)}>
                      <div className='card-img-wraper'>
                        <img className='HomeCardImg img-fluid' src={item.thumbnail} alt={item.title} loading="lazy"/>
                      </div>
                    </Link>
                    <div className="mt-2 px-2">
                      <p className="text-start p-0 m-0 " style={clampStyle}>
                        {item.title}
                      </p>
                      <p className="d-flex mt-2 justify-content-between align-items-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                        <span className="text-success mb-0 text-end h5"> ₹{(item.price * 83).toFixed(2)}</span>
                      </p>
                      {/* <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                        Rating: <span style={{color:"#fc530a"}}>{item.rating}</span>
                      </p> */}
                      <p className="text-start pb-2 m-0 homeCardText text-dark" 
                        style={{ fontSize: '15px', fontWeight: '400' }}>
                        <span style={{ color: "#f89a0dff", fontSize:"20px" }}>
                          {
                            "★".repeat(Math.floor(item.rating)) +
                            (item.rating % 1 >= 0.5 ? "⯨" : "") +
                            "☆".repeat(5 - Math.ceil(item.rating))+" "
                          }
                          <small 
                            className='text-secondary' 
                            style={{ fontSize: "15px" }}
                          >
                            ({item.reviews.length + (randomOffsets[item.id] || 0)})
                          </small>
                        </span>
                      </p>
                    </div>
                    <div className="text-center ">
                      <button className='AddToCartBtn' size="small" style={{ fontSize: '15px' }} onClick={() => handleAddToCart(item)}>
                        Add To Cart
                      </button>
                      <button className='AddToCartBtn' onClick={() => handleRemoveFromWishlist(item.id)}>
                        Remove Item
                      </button>
                    </div>
                  </div>
                  ))}
                </OwlCarousel>
              </div>
            )}
          </div>
        </div>
          {/* Just For you */}
          <div className='container-fluid p-0'>
          <div className='container'>
            <div className='row mt-4 mt-lg-0'>
              <div className='thisMonthCont' style={{display:"flex", alignItems:"center"}}><span></span><h4 className='mt-lg-5  ms-2' style={{color:"#000"}}>Just For you</h4></div>
              <div className="container">
                <OwlCarousel 
                      className="owl-carousel owl-theme py-lg-4"
                      loop={true}
                      margin={20}
                      nav={true}
                      autoplay={true}
                      autoplayTimeout={3000}
                      dots={false}
                      responsive={{
                        0: {
                          items: 2,
                        },
                        768: {
                          items: 4,
                        },
                        1000: {
                          items: 5,
                        },
                        1400: {
                          items: 6,
                        },
                      }}
                    >
                    {filteredProducts.map((item) => (
                      <div className='item CardStyle my-lg-4 mb-4 wishlistIconCont'  key={item.id}>
                        <div className='discount'>
                          <small> -{Math.ceil(item.discountPercentage)}% OFF</small>
                        </div>
                        <Link className='' to="/productDetail" onClick={() => handleProductDetail(item)}>
                          <div className='card-img-wraper'>
                            <img className='HomeCardImg img-fluid' src={item.thumbnail} alt={item.title} loading="lazy"/>
                          </div>
                        </Link>
                        <div className="mt-2 px-2">
                          <p className="text-start p-0 m-0 " style={clampStyle}>
                            {item.title}
                          </p>
                          <p className="d-flex mt-2 justify-content-between align-items-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                            <span className="text-success mb-0 text-end h5"> ₹{(item.price * 83).toFixed(2)}</span>
                            <small className="text-success">in stock <span className='text-danger'>({item.stock})</span></small>
                          </p>
                          {/* <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                            Rating: <span style={{color:"#fc530a"}}>{item.rating}</span>
                          </p> */}
                          <p className="text-start pb-2 m-0 homeCardText text-dark" 
                            style={{ fontSize: '15px', fontWeight: '400' }}>
                            <span style={{ color: "#f89a0dff", fontSize:"20px" }}>
                              <small style={{fontSize:"16px"}}>({item.rating})</small>
                              {
                                "★".repeat(Math.floor(item.rating)) +
                                (item.rating % 1 >= 0.5 ? "⯨" : "") +
                                "☆".repeat(5 - Math.ceil(item.rating))+" "
                              }
                              <small 
                                className='text-secondary' 
                                style={{ fontSize: "15px" }}
                              >
                                ({item.reviews.length + (randomOffsets[item.id] || 0)})
                              </small>
                            </span>
                          </p>
                        </div>
                        <div className="text-center ">
                          <button className='AddToCartBtn' size="small" style={{ fontSize: '15px' }} onClick={() => handleAddToCart(item)}>
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Wishlist;
