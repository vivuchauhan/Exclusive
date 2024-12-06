import React, { useState, useEffect } from 'react';
import "./css/header.css";
import '../App.css';
import { Outlet, Link, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoImg from './images/header/LogoImage.png';

function Header({ onLogout, toggleTheme   }){
    const location = useLocation();
    const cart = useSelector((state) => state.product.cart);

    const wishlist = useSelector((state) => state.product.wishlist);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const scrolled = window.scrollY > 0;
        setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerStyle = {
        position: isScrolled ? 'fixed' : 'unset',
        background: '#fff',
        width: '100%',
        zIndex: 9999,
    };

    return(
        <div className='hederMainContainer'>
          <div style={headerStyle}>
            <div className='Container-fluid topTextBar'>
                <div className='container'>
                <p className='text-white text-center'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <Link to="/" className='text-white ms-2'>ShopNow</Link></p>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg" style={{borderBottom:"1px solid #D6D5D5"}}>
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src={LogoImg} alt='' className='img-fluid Logo'/>
                        <h1 className='pt-2'>Exclusive</h1>
                    </Link>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h3 className="offcanvas-title" id="offcanvasExampleLabel">Items</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body" style={{ justifyContent: "center" }}>
                            <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-4 ">
                                <li className="nav-item">
                                    <Link to="/" className={`nav-link  ${location.pathname === '/' ? 'active' : 'text-dark HeaderNavItem'}`} aria-current="page">Home</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : 'text-dark HeaderNavItem'}`}>About</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/contact" className={`nav-link  ${location.pathname === '/contact' ? 'active' : 'text-dark HeaderNavItem'}`} >Contact</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/signup" className={`nav-link  ${location.pathname === '/signup' ? 'active' : 'text-dark HeaderNavItem'}`}>Signup</Link>
                                </li>
                                <hr/>
                            </ul>
                        </div>
                    </div>
                    <div className="form-check form-switch d-none d-xl-block">
                        <input className="form-check-input theme-toggle-btn" type="checkbox" role="switch"  onClick={toggleTheme}/>
                    </div>
                    <div className='headerIconsCont'>
                        <div className='profileIconCont' tabIndex="0">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" tabIndex="0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi text-dark profileIcon" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                                </button>
                                <ul className="dropdown-menu dropdownMenu">
                                    <li className=''><a className="dropdown-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEoUlEQVR4nO2cTWhdRRSAvyb0N0Goqe3SEooRFBdaF9Y/ROmPCCooZqkW1EJru5N2VbrppkUTG9xJMdbS0qrdKC4UDdEYkS400ZWKTWlL+tp14yJXDpxgqJ2Z+17vfW8mcz44EG7unZl7zr1nzpwz94FhGIZhGIZhGIZhGIZhxEc/sAv4BDgPNIB/VBp67ISeI+caFdANDALjwDxQlJR5veYVoMss0RpPA783oXSXTANPmRHKswr4oALF3yzHgJVmCD/rgMkalL8gE0CfGcGt/Okalb8gU2aEW7udyRLK+xsYArYBA0CPyoAeG9ZzyrwJ5o4WEfL5F4BXNSoKIee8BswE2hwp0VY20U7hkTP6lDdLL3A2EKpmHx11A795lHQEWHYbxpVrjwbmg6zXCYMe5ZytSDlihFOefl4mY8Y9Pr8Vt+NzR645YYxM6fekF2TCrZrXPXPBRjJklyfULBPtNEu3vlm36vNNMuSEQxkS59fF+44+R8mQ8w5lyIKqLnY4+vyZDGk4lHFPjX0OOPqcJUPmHMqQiKUueh193iBD5jpggDvMAP/RMBcU5yS8vcY+n7VJOByGDtdoAAtDF/FWRAuxN8iQfk8qQvL5VbPTk4q4m0wZdyhlpuJoSNq66OjrOzJm0JMm/qzCdPRpTz8vkTHdgUL80ZoLMr/kXpBBy4JFoDDTijuSaz71tCu+/8kW2l2SjASMMKP5/LJF+Z0en9+OcDc5VupWkSIgFzSWl6zmvfqU9+rfO3T3myvUXCzf27aU/9OnRfKiZvkVuLMDD1kyRpioUfny5JvyS7ijkYoVP68+33bDNRkdTVWgfAk1LdppkS7dtzPWwgcaY7rIyj7Or4qNunvhY63hNrSoI3JVj41qYi3b3E4d9ABbgf3AceBH4A/g+iIDXNdjE3rOfr1mTacHnyrrgX3qRlylyzIyp8m2vdqmEeAx4Jx++Vh1CCptfq59GDfxhD6pRZvkW+BxswJsAD5qMsKpUk7rGLLkRZ08iw7LNeB5MmKF7v+cb0JJl7SIv0ejm03AWmC5ylo9Jv97W8+93ET7MpZ3ta0ljWQuvyqplFngPeCh2+hvsxr7ask+v6z4u4ToEm1lv4TcDayusO/V+vaUSVVPLsVviWVB9EOJMHGo5q2JYoiDuhfUN5afah5H231+yO1MA/e1cUz3Bz4OFPliqcwJQ4EbPdmhlEFPYLdEoQX9pHkuEO0c63C2MrRrQsb+AomyIRDnDxMPrj2jhWZd7yJBRgNup4t46Aq4ow9JMLfjcj1TkaaJez0/ECX3soWEcCXWbrQ52mmWBzzp769JhEc8r/Ih4uewZ/yPkgDnPCvcKle3dYanFz0bhqNmvaeYIumFVNjnWa3LL3slN/DZRJ7+BdZ4EnhRP0hjjkFLVjM1hh338g0R+05XBPEg6fGwJ5KL8m3e6immpMgy4Irjnp4hQg44BisbqVLlpOOe3iFCjjsGK4WQVNmbUmrCta1cXFOqbPdsc4+OvxyDTfmn5Dc57ulPIuSaY7ApfxDR57gnWSNEhysElZJkqqzwhKKGYRiGYRiGYRiGYRiGYRiGYRiGYRDiXz5AK/oTL8ibAAAAAElFTkSuQmCC"/>Manage My Account</a></li>
                                    <li className=''><Link to="/orders" className="dropdown-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5ElEQVR4nO2ZTWxNQRiGn2rajZ+yoBsW2CnCQiVIkKBERIl0oxJslKTKqgsJSihNdCPsJCR+wkIIEiwslEiK+Bd6WVALGgs36mfR5Mgkb5PJzeWcM8c1k+qTTHJzz/e9551758x8MweGGfpUAg3AWeAV0K9mPp/RNRMTNGuBt0AU094AawiQEUCHZfQJsB2YBoxUqwFagKdW3CHlBkOHjP0EtsSYM9e2KnawM8EMp0jGFqbIW2R1ph7PVFrPhPkn0rJNuTmgAo80WM+Ey1gvB55JYx0eOScTzRk0dkjjNB55LRNmdnKlRhpmnfHGV5kYlUFjtDSMljcG14NQdJwZMh3pAm4HpPN/sxL4APQCKwLQcabXGtvvA9CJ5VaCsrzU7SYZmRpAJyK1KVk6skEi5/HHBXlozCJyXCKmHvLFTnk4lkXksURq8cdceXiUpQYaAL57PiyoAL7JyxgXgaX6JUJYcbvkZYlL8p6A9tSH5WW3S/INJa/GP/Xycj1totm2flFyNf6ZIC95bY8TM1OJPYRDTp5mpElqUtJJwuGUy2mNU1KJaXL5cXuU1AlMB8rwR5mGeqfLcH9ZULB9BC4Bu4BlwLjS+WY8sFxT7TXgc4GXFy5lQV4n58Wq0T7gns6j9qrANAvWLGCSOmuvxFX6biIwG6hTzj69grhvzZSFLWed2Bhvqc9zL1smFgCtwBV1olTleh64o4V4lf4htCeJ0r6OaFXSkT/EVKtzm4ADegivAt3AO9VGhSYHdK1bsSbnoDSMllkvfsdRaRhviTnxF2at/UU60pZBr1kaxlvqIm1xhhuXa3j0qbWnXZULqJMn4y0xn5RkHsxQmGzNoImoUkK/5/WjWP33Q97GkoBaBZvdYWg8l7c5SYIbFWw2/aFxUd7WJwluU7CZUkOjXd7MApz4LdRGwmOzvJlKIJaHCp5HeMyXtwdJgvMBnCpGCcqYWO4GYDSKacZjamyBf03k8d7DkIVfpRWfgsuh9cUAAAAASUVORK5CYII="/>My Order</Link></li>
                                    <li className=''><Link to="/cancellation" className="dropdown-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3klEQVR4nO2WyUoDQRCGv0P0YnC5aNCrG3hwfw0176LmKrhcRfGo+BCeNEbwHcTl5nZVcEtOMVLwB5px0vaMUSL4Q0Mztf3TVdXV8I8/hhGgABwDF8Crlu2LwDIw/BOBZ4ASUAtcRnC6GYHbgB3gXY4fgF1gTqfRoWX7eWBPOjXZbAOZtMF7gBM5ewNWgc4AO9NZA8rOaXSn+fOSHNwrBUkxDlzLxynQnsR4R4a3QD/pYbZ38rUVajSj/NmxT/J9TCkdVe2/REmMLedxyHpsG8nW5dNa1YsRp9rjCm5FPZ+LkeUkM50ouoBH+R7yEShIydop7u8uJI+SyEVkcSexL/mSj0BRStbTcYgGyjX4Foe8dI58BK6k5LtOowFDgrvpvfQReJGSr9AMvcCZc/VeBrRrVroWoyGeAwn0RQhcBRDolO5TS6eg+AtFeOgjsPwLbbjY0hcRGp81jdRmXcUbIcdfx7SGUTl0eAQMt4qG0USo0bYY2ygd+EbwAWccbyYxzDipsAfJbIrg9rc3zhRM/DTrdkiUNVKtmL5Cl3Jece7+xE+yOjJ6yVTl7FHttACMquiy2uclq1d7Vcee+lHqYgw4SPAsLzapgD9hSPP8SD3/onWuFrNLZvCz2T9aGB9HiMQfIzaPcAAAAABJRU5ErkJggg=="/> My Cancellations</Link></li>
                                    <li className=''><a className="dropdown-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5klEQVR4nO2ZaahNaxjHf8c5uAfXlEPGpMzDByGzW265fCDXUPcDMuSTWfKB4pshlCljXVxdRd2MR9dMXeEDkumQFNec46Acw3G2Hv1Xve32OXvtY6119opfrdq969nP87zvWut9hhd+4IsawFngjH7Hll+BhK6hxJg9zkT+JqY0BkqBMl2lGosds/QkCoGj+j2TGHJFzo8Bxur3NWJGbzn+AqgN1AKeaawXMWKznF7ljK3W2CZiQj7wSk53ccY7aawEqEMMmCSH/0tx77zuTSQGnJOzU1Lcm6p7Fu2zmg5AOfAW+DnF/XrAG03GXrWsZbmc3FaJzHbJLCNLyQMey8m+lcj1k8xToCZZyCg5eMuH7A3JjiQLOSjn5vmQnS/ZA1RDbCgA2gE9gcHAcGAcMB1YAHwCPkguHQWS/aT/Tpeu4dLdU7YKZNsXE4A/gX3AceACcB24DxQrc034vPZmsDh7M9BbJl/uy7cL8nWffLc58NyHolLlTfeAy4oVhXJmK7AGWAI0z2AiLfSfNdJhugql+7JsvZDtdP7ZHPhNaUNCe/x4oBvQFmgE5FL95MqXtvJtvBOPSjSHr7QHbjoZ6y9kL/2BJ/L1blI+95X6zs5jH+EMso9p2iTMx3/1lCp8hF50tmtLlgStvBR+2Vha/gDe6U/28TWl+mgMnJAv74HJmSqwvfyBFNzTRxY1HYHb8uFxmtQn7RZ5UYosox1NdIxwdlPbjtt8q0KruXdIYbne1TC7hjnAQuCzbO4JuqKc7UR5C151CZ6fgL+cRVuqiYX6uK3d0zpA3abLayGVyFaoWGVXJIOW5wSF9/oWRVk9rpdRy5WCwl4j07mOCPHSmQEB6hwonVZ0RUILJ8EMMupbpH4t3a2IsG91KATdh6Pse+2SsTkh6J4r3TuJgIcyFkbK0l26HxEynWXoic9A1UlnI0d9bqk5Tq1htkJjpoxY9E334S5MKlM/Kr2xI4bK2C35UOuh/TJSWSrdRwc6XpqxXVe5c9hjMhUxWXJmKxRyneOCVKlJvla8zEn97VTXY5CadwklhFvUC06mlZOm+CqeMsVrdVp9kMwQ4I5TJq+tIKnMVwT3ylVr7wxLIVfko/VaZRZL+QZnrKFW1nttrurYLR09gEtJ/bAmzv2NGl8Uwjw4LeVecTXOORd8p5XOJNLnqTR4Kx0v1XE0ftfYqaAnUUf1sr3/XYF/nNU8p5K0qlhr9Jij74ieWJlewUDrnmHOynuNsWKdSgVR+ORIV7GTx3nNj1TfUJVZmdSitDyrJcHTzEmBvGtFkAZOSun/OgcJm1GylZDtwBiiXasB0dFANs3298MXw0hXuTS4jKMAAAAASUVORK5CYII="/>My Reviews</a></li>
                                    <li className=''  onClick={onLogout}><a className="dropdown-item"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtUlEQVR4nN2VPQoCMRCFPzu9lK5nkW08giKW2nkKcwmLnGU9hiDKgynEYrOTGNj1wXRv3hfyNzACrYEA3BIlT5MT/gS6AYDOvC5IsMb5AK88d+DqAUSrWn6mC9gBm1qAC/AC9kBr9TPA2cIFyVHsA5wKw3sBRwt/JB5Ty1gB31s0I08xdcilkOi5poca1/TzoW0n/VX8DyA4Bs4iZ+A0NgbVmBqZ8si78gAkNWhVKYA8S294sd6Zi20weGW5MQAAAABJRU5ErkJggg=="/>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        <Link to="/wishlist" className='float-right WishlistCountCont cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart text-dark wishlistIcon" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                            <div className='WishlistCountstyle' style={{ display: wishlist.length === 0 ? 'none' : 'block' }}><span>{wishlist.length}</span></div>
                        </Link>
                        <Link to="/cart" className='float-right cursor-pointer CartCountstyleCont' >
                            <Link to="/cart" style={{ display: cart.length === 0 ? 'none' : 'block' }}> <div className='CartCountstyle'><span>{cart.length}</span></div></Link>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-cart3 headerCartIcon" style={{color:"black"}} viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle" tabIndex="0">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
            <Outlet />
        </div>
        </div>
        
    )
}

export default Header;