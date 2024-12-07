import React, { useEffect, useState } from 'react';
import "./css/product.css";
import {useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  addToCart, productDetail, addToWishlist } from '../redux/action/action';
import Header from './Header';
import Footer from './footer';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

import ProductDImg1 from './images/productDetail/icon2.png';
import ProductDImg2 from './images/productDetail/Icon1.png';

const DiscriptionStyle = {
    fontSize: "15px",
    fontWeight: "400"
};
const clampStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 1,
    fontSize: '20px',
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

function ProductDetail() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.product);
    const product = useSelector((state) => state.product.productDetails);


    const [wishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist')) || []
    );
    const [addtoWishList, setAddtoWishList] = useState(false);

    const [wishlistState, setWishlistState] = useState({
        isAdded: false,
        imageSrc:"data:image/png;base64,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"
    });
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    

    console.log("product-detail", product);

    if (!product || product.length === 0) {
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <h1 className='text-center my-5'>No Product Available</h1>
                </div>
            </>
        );
    }
    const currentItem = product[product.length - 1];

    const toggleTheme = () => {
        const currentTheme = document.body.classList.contains('theme-light')
          ? 'theme-light'
          : 'theme-dark';
    
        document.body.classList.remove(currentTheme);
        document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleProductDetail = (productDetails) => {
        dispatch(productDetail(productDetails));
      };
    
      const relatedProducts = products.filter((item) =>
      item.category.toLowerCase() === currentItem.category.toLowerCase() &&
      item.id !== currentItem.id 
  );

    const handleAddToWishlist = (currentItem) => {
        setAddtoWishList(!addtoWishList);
        dispatch(addToWishlist(currentItem));
        setWishlistState((prevState) => ({
          ...prevState,
          isAdded: !prevState.isAdded,
          imageSrc: prevState.isAdded
            ? "data:image/png;base64,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"
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdklEQVR4nO2WvUoDQRSFJ9oogoI/iM+hRdRiyZ6zm32BgDaCbyC+QGy0VWMjASujdlY+gFgoYqFICDqzQYgpk94IupIQRUN2s8lmCtEPbrNc5tszc2FGiH/+LCqRWFDAsSLLCqgp8lkBh65tz7b2uuScInM/eskjBcyHFnqp1KAkM4r02pUE3iSw6QkRq5cktyT53ra3/h3Yqa/ZURwkbVk0I4G9ML0K2O4kjfv9fdRyLWsxSHyiQ9qsnK+4MRyaxBIoBYlftSUGav5ioKpxqytBiS80Jj4PSryu7YzJNV9xAZhQwIuO85WOMyWCkEBWQ+L9QOlXarLSx7TVB8OY7ChupCZX+yheCSX9RJEHkQcKyIpuKcXjwwq4ijDFl0+GMSR6oUiOKeC2B+l93rbHRRQKyeSMJPPdSIumOR1J+n3SJXATQnwdOWkrd5Y1IoHTAOmZdJxRoQNPiJgCNto8Fna9dHpA6OaRXG7e3WXXNJe0C//5lXwA64+yvErf+LAAAAAASUVORK5CYII="
        }));
    };
      

    return (
        <>
            <Header toggleTheme={toggleTheme}/>
            <div className="container-fluid pb-5">
                <div className='container'>
                    <div className='row ProductDetailCardStyle col-12 py-5 pb-5' key={currentItem.id}>
                        <div className='col-md-6 d-flex justify-content-center' style={{background:"#F5F5F5", alignItems:"center"}}><img src={currentItem.image} style={{  }}  className='py-5 productDetailImg'/></div>
                        <div className='col-md-6 ps-lg-5  '>
                            <div className=''>
                                <p className=' p-1 m-0' style={{ fontSize: "20px", fontWeight: "600" }}> {currentItem.title}</p>
                                <p className=' pb-2 p-1 m-0' style={{ fontSize: "15px", fontWeight: "600" }}>Rating:<span style={{color:"#fc530a", fontWeight:"600"}}> {currentItem.rating.rate} </span></p>
                                <p className=' p-1 m-0' style={{ fontSize: "15px", fontWeight: "600" }}>Price: <span className='text-success'>₹{currentItem.price}</span></p>
                                <p className=' p-1 m-0' style={{ fontSize: "15px", fontWeight: "600" }}>Category: <span style={{color:"#908e91"}}>{currentItem.category}</span></p>
                                <p className=' p-1 m-0' style={DiscriptionStyle}><span style={{ fontSize: "15px", fontWeight: "600" }}>Description:</span> {currentItem.description}</p>
                            </div>
                            <div className='my-3' style={{ display:"flex", gap:"10px", alignItems:"center"}}>
                                <span style={{fontSize:"16px", fontWeight:"600"}} className='ms-1'>Size :  </span>
                                <input type="radio" className="btn-check" name="options-base" id="option5" autocomplete="off" />
                                <label className="btn" for="option5">S</label>

                                <input type="radio" className="btn-check" name="options-base" id="option6" autocomplete="off"/>
                                <label className="btn" for="option6">M</label>

                                <input type="radio" className="btn-check" name="options-base" id="option7" autocomplete="off"/>
                                <label className="btn" for="option7">L</label>

                                <input type="radio" className="btn-check" name="options-base" id="option8" autocomplete="off"/>
                                <label className="btn" for="option8">XL</label>

                                <input type="radio" className="btn-check" name="options-base" id="option8" autocomplete="off" disabled/>
                                <label className="btn" for="option8">XXL</label>
                            </div>
                            <div className=' mt-3 p-1 d-flex gap-2'>
                                <button size="small" style={{ fontSize: "15px", color: "white", background:"#DB4444" }} className='border-0 px-3 py-1'>Buy Now</button>
                                <button size="small" style={{ fontSize: "15px", color: "white", background:"#000"  }} className='border-0 px-3 py-1' onClick={() => handleAddToCart(currentItem)}>Add To Cart</button>
                                <button className='Btn wishlistBtn' onClick={() => handleAddToWishlist(currentItem)}>
                                 <img className='wishlistIcon' src={wishlistState.imageSrc} alt='imgWishlist' />
                                </button>
                            </div>
                            <div>
                                <div className='d-flex mt-3' style={{border:"1px solid #7D8184", padding:"10px 20px"}}>
                                <img src={ProductDImg1} alt='...' className='img-fluid' style={{width:"30px", height:"30px"}}/>
                                <div className='ps-3'>
                                    <p className='m-0' style={{fontSize:"16px", fontWeight:"600"}}>Free Delivery</p>
                                    <a href='' className='text-dark' style={{fontSize:"14px", fontWeight:"400"}}>Enter your postal code for Delivery Availability</a>
                                </div>
                                </div>
                                <div className='d-flex mt-0' style={{border:"1px solid #7D8184", borderTop:"none", padding:"10px 20px"}}> 
                                <img src={ProductDImg2} alt='...' className='img-fluid' style={{width:"30px", height:"30px"}}/>
                                <div className='ps-3'>
                                    <p className='m-0' style={{fontSize:"16px", fontWeight:"600"}}>Return Delivery</p>
                                    <a href='' style={{fontSize:"14px", fontWeight:"400"}} className='text-dark'>Free 30 Days Delivery Returns. Details</a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row ps-lg-5'>
                        <div className='container ps-lg-5' style={{display:"flex", alignItems:"center"}}><span style={{width:"15px", height:"30px", background:"#DB4444", borderRadius:"3px"}}></span><h4 className='mt-2 ms-2' style={{color:"#DB4444"}}>Related Item</h4></div>
                        <div className="container ps-lg-5" style={{ overflow: 'hidden', overflowY: 'hidden' }}>
                            <div className="container ps-0">
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
                                {relatedProducts.map((item) => (
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
            </div>
            <Footer/>
        </>
    );
}

export default ProductDetail;

