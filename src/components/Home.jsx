
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/home.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addToCart, productDetail  } from '../redux/action/action';

import CaroselImg1 from './images/carosel/banner1.png';
import CaroselImg2 from './images/carosel/banner2.png';
import CaroselImg3 from './images/carosel/banner3.png';
import CaroselImg4 from './images/carosel/banner4.png';
import BannerImg1 from "./images/Home/banner-middle.png"
import aboutLastContImg1 from './images/about/S1.png';
import aboutLastContImg2 from './images/about/S2.png';
import aboutLastContImg3 from './images/about/S3.png';
import FlashSaleCountdown from './flashSaleCountdown';
import SideNavBar from './sideNavBar';


import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';



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



function Home() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.product);
  const [searchInput, setSearchInput] = useState('');
  const [randomOffsets, setRandomOffsets] = useState({});

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    document.querySelectorAll(".owl-carousel").forEach((el) => {
      el.addEventListener(
        "touchstart",
        (event) => {},
        { passive: true }
      );
    });
  }, []);
  

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

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

  const handleProductDetail = (productDetails) => {
    dispatch(productDetail(productDetails));
  };
  const bestSellingProducts = products.filter((item) => item.rating >= 4.5);
  const FlashSale = products.filter((item) => item.rating <= 3);



  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue.trim() === '') {
        setSearchResults([]);
    } else {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        const truncatedResults = filteredProducts.map((product) => ({
          ...product,
          title: product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title
      }));
        setSearchResults(truncatedResults);
    }
   };

  const handleSearchResultClick = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      handleProductDetail(product);
    }
  };

  return (
        <>
          {/* carosel content */}
          <div className='d-md-flex container-fluid p-0'>
            <div className='container p-0'>
              <div className='row caroselRow p-0 m-0'>
                <div className='col-md-3 col-12 d-none d-lg-block' style={{borderRight:"1px solid #D6D5D5"}}>
                 <SideNavBar/>
                </div>
                <div className="col-md-9 col-12 pt-lg-4 ps-lg-4 mt-3 mt-lg-0">
                  <OwlCarousel
                    className="owl-theme maincarosel"
                    loop
                    margin={10}
                    autoplay
                    autoplayTimeout={3000}
                    dots
                    nav
                    items={1}
                    navText={[
                      "<span class='carousel-control-prev-icon'></span>",
                      "<span class='carousel-control-next-icon'></span>",
                    ]}
                  >
                    {/* Slide 1 */}
                    <div className="item">
                      <img src={CaroselImg1} className="d-block w-100" alt="..." />
                    </div>

                    {/* Slide 2 */}
                    <div className="item">
                      <img src={CaroselImg2} className="d-block w-100" alt="..." />
                    </div>

                    {/* Slide 3 */}
                    <div className="item">
                      <img src={CaroselImg3} className="d-block w-100" alt="..." />
                    </div>
                    {/* Slide 4 */}
                    <div className="item">
                      <img src={CaroselImg4} className="d-block w-100" alt="..." />
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
          {/* flash sale content */}
          <div className="container-fluid pt-lg-2 p-0">
            <div className='container'>
              <div className='row'>
                <div className='searchCont'>
                  <div className='' style={{display:"flex", alignItems:"center"}}><span></span><h4 className='mt-5 ms-2' style={{color:"#DB4444"}}>Todays</h4></div>
                  <div className='searchCont2' >
                    <div className="d-flex justify-content-center searchInputCont me-lg-5 mt-5 ps-0">
                      <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        className='w-100 bg-transparent form-control'
                        style={{border:"none", boxShadow:"none"}}
                      />
                      <div className="d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                      </div>
                    </div>
                    {/* Search results */}
                    {searchResults.length > 0 && (<div className="container searchResultsListCont px-0">
                      <ul className="searchResultsList bg-light border px-2 list-unstyled">
                        {searchResults.map((item) => (
                          <li key={item.id} className='' style={{cursor:"pointer"}} onClick={() => handleProductDetail(item)}>
                            <Link className='results' style={{fontSize:"18px"}} to="./productDetail" onClick={() => handleSearchResultClick(item.id)}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>)}
                  </div>
                </div>
                <div className='d-flex flashSaleCont'>
                 <div className='d-flex align-items-end'>
                   <h2 className='mt-5 ms-lg-2' style={{ color: 'black' }}>Flash Sales</h2>
                    <div className='ms-lg-5 d-flex'>
                      <FlashSaleCountdown/>
                    </div>
                 </div>
                </div>
                <div className="container flashSaleCont-slider">
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
                    {FlashSale.map((item) => (
                      <div className='item CardStyle my-lg-4 mb-4 wishlistIconCont'  key={item.id}>
                       <div className='discount'>
                          <small> -{Math.ceil(item.discountPercentage)}%</small>
                        </div>
                        <Link className='' to="/productDetail" onClick={() => handleProductDetail(item)}>
                          <div className='card-img-wraper'>
                            <img className='HomeCardImg img-fluid' src={item.thumbnail} alt={item.title} />
                          </div>
                        </Link>
                        <div className="mt-2 px-2">
                          <p className="text-start p-0 m-0 " style={clampStyle}>
                            {item.title}
                          </p>
                          <p className="d-flex mt-2 justify-content-between align-items-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                            <span className="text-success mb-0 text-end h5"> ₹{item.price}</span>
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
          {/* Best Selling Products */}
          <div className='container-fluid p-0'>
            <div className='container'>
              <div className='row mt-4 mt-lg-0'>
                <div className=' thisMonthCont' style={{display:"flex", alignItems:"center"}}><span></span><h4 className='mt-lg-5  ms-2' style={{color:"#DB4444"}}>This Month</h4></div>
                <div className='d-flex thisMonthBtnCont'>
                  <h2 className='mt-lg-0 mt-1 ms-lg-3 me-auto' style={{color:"black"}}>Best Selling Products</h2>
                  <Link className='' to="/bestSelling"><button className='btn bg-danger text-white me-lg-5 px-lg-5 px-3'>View All</button></Link>
                </div>
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
                     
                         {bestSellingProducts.map((item) => (
                          <div className='item CardStyle my-lg-4 mb-4 wishlistIconCont'  key={item.id}>
                          <div className='discount'>
                              <small> -{Math.ceil(item.discountPercentage)}%</small>
                            </div>
                            <Link className='' to="/productDetail" onClick={() => handleProductDetail(item)}>
                              <div className='card-img-wraper'>
                                <img className='HomeCardImg img-fluid' src={item.thumbnail} alt={item.title} />
                              </div>
                            </Link>
                            <div className="mt-2 px-2">
                              <p className="text-start p-0 m-0 " style={clampStyle}>
                                {item.title}
                              </p>
                              <p className="d-flex mt-2 justify-content-between align-items-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                                <span className="text-success mb-0 text-end h5"> ₹{item.price}</span>
                                <small className="text-success">in stock <span className='text-danger'>({item.stock})</span></small>
                              </p>
                              {/* <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                                Rating: <span style={{color:"#fc530a"}}>{item.rating}</span>
                              </p> */}
                              <p className="text-start pb-2 m-0 homeCardText text-dark" 
                                style={{ fontSize: '15px', fontWeight: '400' }}>
                                <span style={{ color: "#fc530a", fontSize:"20px" }}>
                                  {
                                    "★".repeat(Math.floor(item.rating)) +
                                    (item.rating % 1 >= 0.5 ? "⯨" : "") +
                                    "☆".repeat(5 - Math.ceil(item.rating))+" "
                                  }
                                  <small className='text-secondary' style={{fontSize:"16px"}}>({item.reviews.length})</small>
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
          {/* banner content */}
          <div className='container-fluid  my-5 p-0'>
            <div className='container p-0'>
              <img src={BannerImg1} alt='..' className='img-fluid HomeBannerImg'/>
            </div>
          </div>
          {/* Explore Our Products */}
          <div className='container-fluid p-0'>
            <div className='container'>
              <div className='row mt-4 mt-lg-0'>
                <div className='thisMonthCont' style={{display:"flex", alignItems:"center"}}><span></span><h4 className='mt-lg-5  ms-2' style={{color:"#DB4444"}}>Our Products</h4></div>
                <div className='d-flex thisMonthBtnCont'>
                  <h2 className='mt-lg-0 mt-1 ms-lg-3 me-auto' style={{color:"black"}}>Explore Our Products</h2>
                </div>
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
                        {products.map((item) => (
                          <div className='item CardStyle my-lg-4 mb-4 wishlistIconCont'  key={item.id}>
                          <div className='discount'>
                              <small> -{Math.ceil(item.discountPercentage)}%</small>
                            </div>
                            <Link className='' to="/productDetail" onClick={() => handleProductDetail(item)}>
                              <div className='card-img-wraper'>
                                <img className='HomeCardImg img-fluid' src={item.thumbnail} alt={item.title} />
                              </div>
                            </Link>
                            <div className="mt-2 px-2">
                              <p className="text-start p-0 m-0 " style={clampStyle}>
                                {item.title}
                              </p>
                              <p className="d-flex mt-2 justify-content-between align-items-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                                <span className="text-success mb-0 text-end h5"> ₹{item.price}</span>
                                <small className="text-success">in stock <span className='text-danger'>({item.stock})</span></small>
                              </p>
                              {/* <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                                Rating: <span style={{color:"#fc530a"}}>{item.rating}</span>
                              </p> */}
                              <p className="text-start pb-2 m-0 homeCardText text-dark" 
                                style={{ fontSize: '15px', fontWeight: '400' }}>
                                <span style={{ color: "#fc530a", fontSize:"20px" }}>
                                  {
                                    "★".repeat(Math.floor(item.rating)) +
                                    (item.rating % 1 >= 0.5 ? "⯨" : "") +
                                    "☆".repeat(5 - Math.ceil(item.rating))+" "
                                  }
                                  <small className='text-secondary' style={{fontSize:"16px"}}>({item.reviews.length})</small>
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
          {/* last container */}
          <div className='container-fluid p-0'>
            <div className='container'>
              <div className='row py-5'>
                <div className='homeLastCont d-flex flex-column flex-md-row justify-content-center col-12'>
                  <div className='col-md-4 col-12 d-flex align-items-center justify-content-center'>
                    <img src={aboutLastContImg1} className='img-fluid' alt='..' />
                    <span>FREE AND FAST DELIVERY</span>
                    <p>Free delivery for all orders over  ₹350</p>
                  </div>
                  <div className='col-md-4 col-12 d-flex align-items-center justify-content-center'>
                    <img src={aboutLastContImg2} className='img-fluid' alt='..' />
                    <span>24/7 CUSTOMER SERVICE</span>
                    <p>Friendly 24/7 customer support</p>
                  </div>
                  <div className='col-md-4 col-12 d-flex align-items-center justify-content-center'>
                    <img src={aboutLastContImg3} className='img-fluid' alt='..' />
                    <span>MONEY BACK GUARANTEE</span>
                    <p>We reurn money within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
  );
}


export default Home;


