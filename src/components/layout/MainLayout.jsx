import Header from "./Header";
import Footer from "./Footer";
import SocialBubbles from "../ui/SocialBubbles";
import NotificationToast from "../ui/NotificationToast";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NotificationToast />
      <main>{children}</main>
      <Footer />
      <SocialBubbles />
    </>
  );
};

export default MainLayout;
