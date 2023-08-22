import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "Pages/Home";
import ProductDetail from "Pages/ProductDetail";
import ProductList from "Pages/ProductList";
import Cart from "Pages/Cart";
import Order from "Pages/Order";
import OrderComplete from "Pages/OrderComplete";
import Login from "Pages/Login";
import SignUp from "Pages/SignUp";
import Notice from "Pages/Notice";
import FAQ from "Pages/FAQ";
import Inquiry from "Pages/Inquiry";
import Recipe from "Pages/Recipe";
import Review from "Pages/Review";
import ApplyEvent from "Pages/ApplyEvent";
import Event from "Pages/Event";
import BoardPost from "Pages/BoardPost";
import MobileCategory from "Pages/MobileCategory";
import MobileSearch from "Pages/MobileSearch";
import MobileMenu from "Pages/MobileMenu";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="itemlist" element={<ProductList />} />
          <Route path="item/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order/complete" element={<OrderComplete />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="notice" element={<Notice />} />
          <Route path="notice/:id" element={<BoardPost title="공지사항" />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe/:id" element={<BoardPost title="레시피" />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:id" element={<BoardPost title="상품후기" />} />
          <Route path="/applye" element={<ApplyEvent />} />
          <Route path="/applye/:id" element={<BoardPost title="상품응모" />} />
          <Route path="/event" element={<Event />} />
          <Route path="/eventp/:id" element={<BoardPost title="이벤트" />} />

          <Route path="/mobilecategory" element={<MobileCategory />} />
          <Route path="/mobilesearch" element={<MobileSearch />} />
          <Route path="/mobilemenu" element={<MobileMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
