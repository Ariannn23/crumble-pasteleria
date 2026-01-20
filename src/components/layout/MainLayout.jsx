import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SocialBubbles from "../ui/SocialBubbles";
import NotificationToast from "../ui/NotificationToast";

const MainLayout = () => {
  return (
    <>
      <Header />
      <NotificationToast />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SocialBubbles />
    </>
  );
};

export default MainLayout;
