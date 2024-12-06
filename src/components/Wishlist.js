import React, { useState } from 'react';
import "./css/product.css";
import "./css/home.css";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, addToCart, productDetail } from '../redux/action/action.js';
import Header from './Header';
import Footer from './footer';
import LoginForm from './login';
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

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const wishlist = useSelector((state) => state.product.wishlist);
  console.log('wishlist component', wishlist)
  const dispatch = useDispatch();
  const [localWishlist, setLocalWishlist] = useState(wishlist);

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase()
  );
  const handleProductDetail = (productDetails) => {
    dispatch(productDetail(productDetails));
  };


  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains('theme-light') ? 'theme-light' : 'theme-dark';
    document.body.classList.remove(currentTheme);
    document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header onLogout={handleLogout} toggleTheme={toggleTheme}/>
          <div className="container-fluid">
            <div className='container d-flex justify-content-center'>
              {localWishlist && localWishlist.length === 0 ? (
                <div className='pt-4'>
                  <img src={WishlistImg} alt='wishlistImg' className='img-fluid'/>
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
                        <div style={{overflow:"hidden"}}>
                          <img className='HomeCardImg' src={item.image} alt={item.title} />
                        </div>
                        <div className="mt-2">
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
                            Rating: <span style={{color:"#fc530a"}}>{item.rating.rate}</span>
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
                        <div className='item CardStyle my-4'  key={item.id}>
                          <Link to="/productDetail" onClick={() => handleProductDetail(item)}>
                            <div className='text-center ps-2'>
                              <img className='HomeCardImg' src={item.image} style={{ width: '140px', height: '120px', cursor: 'pointer' }} alt={item.title} />
                            </div>
                          </Link>
                          <div className="mt-2">
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
                              Rating: <span style={{color:"#fc530a"}}>{item.rating.rate}</span>
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
          <Footer />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Wishlist;
