import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/cart';
import About from "./components/about";
import Contact from "./components/contact";
import Blog from "./components/blog";
import ProductDetail from './components/productDetail';
import Signup from './components/Signup';
import Wishlist from './components/Wishlist';
import WomansFashion from './components/WomansFashion';
import MensFashion from './components/mensFashion';
import Jewelery from './components/jewelery';
import Electronics from './components/electronics';
import HomeLifestyle from './components/homeAndLifetyle';
import SportsOutdoor from './components/sportsAndOutdoor';
import BabysToys from './components/babysAndToys';
import GroceriesPets from './components/groceriesAndPets';
import HealthBeauty from './components/healthAndBeauty';
import Checkout from './components/checkout';
import Orders from './components/orders';
import BestSelling from './components/bestSelling';
import Cancellation from './components/cancellationOrder';

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/womansFashion" element={<WomansFashion />} />
          <Route path="/mensFashion" element={<MensFashion />} />
          <Route path="/jewelery" element={<Jewelery />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/homeLifestyle" element={<HomeLifestyle />} />
          <Route path="/sportsOutdoor" element={<SportsOutdoor />} />
          <Route path="/babysToys" element={<BabysToys />} />
          <Route path="/groceriesPets" element={<GroceriesPets />} />
          <Route path="/healthBeauty" element={<HealthBeauty />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/bestSelling" element={<BestSelling />} />
          <Route path="/cancellation" element={<Cancellation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
