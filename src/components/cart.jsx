
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/cart.css";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/action/action';

function Cart() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const cart = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length === 0) {
      setTotalAmount(0);
      setDiscount(0);
      return;
    }

    let total = 0;
    let discountAmt = 0;

    cart.forEach((item) => {
      const price = item.price;
      const qty = item.quantity;

      total += price * qty;
      discountAmt += (price * (item.discountPercentage / 100)) * qty;
    });

    setTotalAmount(total);
    setDiscount((discountAmt * 83).toFixed(2));
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const QuantityDec = (productId) => {
    dispatch(updateQuantity(productId, Math.max(cart.find(item => item.id === productId)?.quantity - 1, 1)));
  };

  const QuantityInc = (productId) => {
    dispatch(updateQuantity(productId, Math.min(cart.find(item => item.id === productId)?.quantity + 1, 5)));
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='container'>
          <div className="row">
            <div className='col-md-8'>
              <div className='my-3 me-auto '>
                <div className='container'>
                  <h4 className='my-2 cartPgHeading'>Cart Products</h4>
                </div>
                <div className='d-lg-flex justify-content-center'>
                  {cart.length !== 0 ? (
                    <ul className='CartContStyle ps-0 d-flex justify-content-start align-items-start'>
                      {cart.map((item) => {
                        const originalPrice = item.price / (1 - item.discountPercentage / 100);
                        const discountedPriceINR = (item.price * 83).toFixed(2);
                        const originalPriceINR = (originalPrice * 83).toFixed(2);

                        return (
                          <div className='d-flex my-3 CarTStyle' key={item.id}>
                            <div style={{ width: '10%' }}>
                              <img
                                src={item.thumbnail}
                                style={{ width: '100%', height: 'auto' }}
                                alt={item.title}
                                loading="lazy"
                              />
                            </div>
                            <div style={{ display: "flex", gap: "10%", width: "90%" }}>
                              <div style={{ width: "50%" }}>
                                <p
                                  className='p-0 ps-3 m-0'
                                  style={{ fontSize: '15px', fontWeight: '600' }}
                                >
                                  {item.title}
                                </p>
                                <p
                                  className='homeCardText ps-3 pb-2 mt-2'
                                  style={{ fontSize: '14px', fontWeight: '500' }}
                                >
                                  Rating: <span style={{ color: "#fc530a" }}>{item.rating}</span>
                                </p>
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "50px", width: "100%" }}>
                                  <p
                                    className='homeCardText me-auto ps-lg-4 p-0 m-0'
                                    style={{ fontSize: '16px', fontWeight: '600' }}
                                  >
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                      <span>Price</span>
                                      <span className='text-success mt-lg-2'>
                                        ₹ {discountedPriceINR}
                                      </span>
                                      <span style={{ textDecoration: "line-through", fontSize: "13px", color: "#888" }}>
                                        ₹ {originalPriceINR}
                                      </span>
                                    </div>
                                  </p>
                                  <p
                                    className='homeCardText pb-2 pe-lg-5 m-0'
                                    style={{ fontSize: '14px', fontWeight: '400' }}
                                  >
                                    <div>
                                      <span style={{ fontSize: '14px', fontWeight: '600' }}>Quantity</span>
                                      <div className='mt-2'>
                                        <button onClick={() => QuantityDec(item.id)} className='border-0 me-lg-2'>-</button>
                                        {item.quantity}
                                        <button onClick={() => QuantityInc(item.id)} className='border-0 ms-lg-2'>+</button>
                                      </div>
                                    </div>
                                  </p>
                                </div>
                                <div className='text-center mt-3'>
                                  <button
                                    className='CartRemoveBtn'
                                    size='small'
                                    style={{ fontSize: '15px', width: "100%" }}
                                    onClick={() => handleRemoveFromCart(item.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className='cartContainer'>
                      <div className='text-center my-3 me-auto'>
                        <img
                          src='https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png'
                          alt='emptyCatImg'
                          className='img-fluid'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='px-3 AmountCarTStyle'>
                <h4>Cart Total</h4>
                <p>Quantity: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
                <p style={{ borderBottom: "1px solid #D6D5D5", fontWeight: "600" }} className='pb-3'>
                  Subtotal: ₹{(totalAmount * 83).toFixed(2)}
                </p>
                {
                  discount ? <p style={{ fontWeight: "600", color: "#05d031ff", fontSize: "16px" }}>
                  Discount: ₹{discount} 🎉
                </p> : null
                }
                <p style={{ borderBottom: "1px solid #D6D5D5" }} className='pb-3'>
                  Shipping: <span className='ps-2 text-success' style={{ font: "14px", fontWeight: "400" }}>Free</span>
                </p>
                <h5>Total: ₹{((totalAmount * 83) - discount).toFixed(2)} /-</h5>

                {cart.length !== 0 ? (
                  <Link to="/checkout" className='text-center mt-3'>
                    <button
                      className='CartRemoveBtn'
                      style={{ fontSize: '22px', width: "100%", height: "38px", fontWeight: "600" }}
                    >
                      Proceed to checkout
                    </button>
                  </Link>
                ) : (
                  <Link to="/" className='text-center mt-3'>
                    <button
                      className='CartRemoveBtn'
                      style={{ fontSize: '22px', width: "100%", height: "38px", fontWeight: "600" }}
                    >
                      Proceed to checkout
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
