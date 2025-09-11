
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/womansFash.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addToCart, productDetail  } from '../redux/action/action';

import SideNavBar from './sideNavBar';


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



function Electronics() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    console.log("electronics Component", products)

    const electronicsCategories = [
      "laptops",
      "mobile-accessories",
      "smartphones",
      "tablets"
    ];

    const electronics = products.filter((item) =>
      electronicsCategories.includes(item.category)
    );

    const totalPages = Math.ceil(electronics.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = electronics.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo(0, 0);
      }
    };
    

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
            <div className='col-md-3 col-12 d-none d-lg-block' style={{ borderRight: "1px solid #D6D5D5" }}>
              <SideNavBar/>
            </div>
            <div className="col-md-9 col-12 pt-lg-4 p-0">
              <div className='row justify-content-center'>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb ps-3">
                  <li class="breadcrumb-item"><a href="./">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Electronics collection's</li>
                </ol>
              </nav>
                {paginatedProducts.map((item) => (
                  <div className='col-md-4 col-sm-6 col-12 mb-4 WomansCardStyle' key={item.id}>
                    <Link to="/productDetail" onClick={() => handleProductDetail(item)} style={{ overflow: "hidden", textDecoration: "none" }}>
                      <div style={{ overflow: "hidden" }}>
                        <img className='HomeCardImg' src={item.thumbnail} alt={item.title} />
                      </div>
                    </Link>
                    <div className="mt-2 text-center">
                      <p className="text-center p-0 m-0 " style={clampStyle}>
                        {item.title}
                      </p>
                     
                      <p className="text-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                        <span className="text-success"> ₹{(item.price * 83).toFixed(2)}</span>
                      </p>
                      {/* <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                        Rating: <span style={{ color: "#fc530a" }}>{item.rating}</span>
                      </p> */}
                      <p className="text-center pb-2 m-0 homeCardText text-dark" 
                            style={{ fontSize: '15px', fontWeight: '400' }}>
                            <span style={{ color: "#fc530a" }}>
                              {
                                "★".repeat(Math.floor(item.rating)) +
                                (item.rating % 1 >= 0.5 ? "⯨" : "") +
                                "☆".repeat(5 - Math.ceil(item.rating))
                              }
                            </span>
                          </p>
                      <button className='AddToCartBtn' size="small" style={{ fontSize: '15px' }} onClick={() => handleAddToCart(item)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
             {/* Pagination Controls */}
                <div className="d-flex justify-content-center align-items-center gap-2 my-4">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-secondary d-flex align-items-center justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                      <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button key={index + 1}
                      className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-secondary d-flex align-items-center justify-content-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                      </svg>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Electronics;
