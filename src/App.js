
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";

import Home from "./components/home.jsx";
import Cart from "./components/cart.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import Blog from "./components/blog.jsx";
import ProductDetail from "./components/productDetail.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Wishlist from "./components/wishlist-products.jsx";
import WomansFashion from "./components/womans-fashion.jsx";
import MensFashion from "./components/mensFashion.jsx";
import Jewelery from "./components/jewelery.jsx";
import Electronics from "./components/electronics.jsx";
import HomeLifestyle from "./components/homeAndLifetyle.jsx";
import SportsOutdoor from "./components/sportsAndOutdoor.jsx";
import BabysToys from "./components/babysAndToys.jsx";
import GroceriesPets from "./components/groceriesAndPets.jsx";
import HealthBeauty from "./components/healthAndBeauty.jsx";
import Checkout from "./components/checkout.jsx";
import Orders from "./components/orders.jsx";
import BestSelling from "./components/bestSelling.jsx";
import Cancellation from "./components/cancellationOrder.jsx";
import Portfolio  from "./components/portfolio.jsx";
import Vehicle from "./components/vehicle.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({
            uid: user.uid,
            name: userDoc.data().name,
          });
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle logout globally
  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  if (loading) return <div className="position-relative">
      <div className="text-center d-flex justify-content-center align-items-center gap-2 mt-5 mt-5 position-absolute leading-message">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h2>Loading...</h2>
      </div>
    </div>;

  return (
    <BrowserRouter>
      <Header user={currentUser} onLogout={handleLogout} />
      <Routes>
        {/* Public routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/" element={<Portfolio />} />
        <Route path="/bestSelling" element={<BestSelling />} />
        <Route path="*" element={<NotFound />} />

        {/* Auth routes (redirect if logged in) */}
        <Route
          path="/signup"
          element={!currentUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to="/" />}
        />

        {/* Protected routes (redirect if NOT logged in) */}
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={currentUser ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishlist"
          element={currentUser ? <Wishlist /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={currentUser ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={currentUser ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/cancellation"
          element={currentUser ? <Cancellation /> : <Navigate to="/login" />}
        />
        <Route
          path="/productDetail"
          element={currentUser ? <ProductDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/womansFashion"
          element={currentUser ? <WomansFashion /> : <Navigate to="/login" />}
        />
        <Route
          path="/mensFashion"
          element={currentUser ? <MensFashion /> : <Navigate to="/login" />}
        />
        <Route
          path="/jewelery"
          element={currentUser ? <Jewelery /> : <Navigate to="/login" />}
        />
        <Route
          path="/electronics"
          element={currentUser ? <Electronics /> : <Navigate to="/login" />}
        />
        <Route
          path="/homeLifestyle"
          element={currentUser ? <HomeLifestyle /> : <Navigate to="/login" />}
        />
        <Route
          path="/sportsOutdoor"
          element={currentUser ? <SportsOutdoor /> : <Navigate to="/login" />}
        />
         <Route
          path="/babysToys"
          element={currentUser ? <BabysToys /> : <Navigate to="/login" />}
        />
         <Route
          path="/groceriesPets"
          element={currentUser ? <GroceriesPets /> : <Navigate to="/login" />}
        />
         <Route
          path="/healthBeauty"
          element={currentUser ? <HealthBeauty /> : <Navigate to="/login" />}
        />
         <Route
          path="/vehicle"
          element={currentUser ? <Vehicle /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
