import Header from "Header/Header";
import Banner from "Components/Banner";
import FrontItems from "./Parts/FrontItems";
import TodayRecipe from "./Parts/TodayRecipe";
import MiniBanner from "./Parts/MiniBanner";
import FrontReview from "./Parts/FrontReview";
import DeliveryBanner from "./Parts/DeliveryBanner";
import MobileHeader from "Header/MobileHeader";
import Footer from "Footer/Footer";
import MobileNav from "Header/MobileNav";

function Home() {
  return (
    <>
      <Header />
      <MobileHeader />
      <Banner />
      <FrontItems title="베스트 상품" productIds={[1, 17, 10, 15]} />
      <TodayRecipe />
      <FrontItems title="알뜰 상품" productIds={[7, 15, 10, 22]} />
      <MiniBanner />
      <FrontItems title="추천 상품" productIds={[12, 7, 13, 14]} />
      <FrontReview />
      <DeliveryBanner />
      <MobileNav />
      <Footer />
    </>
  );
}

export default Home;
