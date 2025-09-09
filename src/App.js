
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./components/home";
import Cart from "./components/cart";
import About from "./components/about";
import Contact from "./components/contact";
import Blog from "./components/blog";
import ProductDetail from "./components/productDetail";
import Signup from "./components/signup";
import Login from "./components/login";
import Wishlist from "./components/wishlist-products";
import WomansFashion from "./components/womans-fashion";
import MensFashion from "./components/mensFashion";
import Jewelery from "./components/jewelery";
import Electronics from "./components/electronics";
import HomeLifestyle from "./components/homeAndLifetyle";
import SportsOutdoor from "./components/sportsAndOutdoor";
import BabysToys from "./components/babysAndToys";
import GroceriesPets from "./components/groceriesAndPets";
import HealthBeauty from "./components/healthAndBeauty";
import Checkout from "./components/checkout";
import Orders from "./components/orders";
import BestSelling from "./components/bestSelling";
import Cancellation from "./components/cancellationOrder";
import { Portfolio } from "./components/portfolio";
import Vehicle from "./components/vehicle";

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
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/bestSelling" element={<BestSelling />} />

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
          path="/"
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
