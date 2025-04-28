
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/womansFash.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addToCart, productDetail  } from '../redux/action/action';
import Header from './header';
import Footer from './footer';
import LoginForm from './login';

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



function GroceriesPets() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.product);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    console.log("homeLifestyle Component", products)

    const homeLifestyleCategories = [
      "groceries",
    ];

    const homeLifestyle = products.filter((item) =>
      homeLifestyleCategories.includes(item.category)
    );

    const totalPages = Math.ceil(homeLifestyle.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = homeLifestyle.slice(indexOfFirstProduct, indexOfLastProduct);
  
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

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    const toggleTheme = () => {
        const currentTheme = document.body.classList.contains('theme-light')
        ? 'theme-light'
        : 'theme-dark';

        document.body.classList.remove(currentTheme);
        document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
    };


  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header onLogout={handleLogout} toggleTheme={toggleTheme}/>
          <div className='d-md-flex container-fluid p-0'>
            <div className='container p-0'>
              <div className='row caroselRow p-0 m-0'>
                <div className='col-md-3 col-12 d-none d-lg-block' style={{ borderRight: "1px solid #D6D5D5" }}>
                  <SideNavBar/>
                </div>
                <div className="col-md-8 col-12 pt-lg-4 p-0">
                  <div className='row justify-content-center'>
                  <h4 className='text-center'>Groceries collection's</h4>
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
                          <p className="text-center p-0 m-0 homeCardText" style={CategoryclampStyle}>
                            {item.category}
                          </p>
                          <p className="text-center p-0 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '600' }}>
                            Price: <span className="text-success"> ₹{item.price}</span>
                          </p>
                          <p className="text-center pb-2 m-0 homeCardText text-dark" style={{ fontSize: '15px', fontWeight: '400' }}>
                            Rating: <span style={{ color: "#fc530a" }}>{item.rating}</span>
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
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-secondary">Prev</button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button key={index + 1}
                        className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-secondary">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default GroceriesPets;
