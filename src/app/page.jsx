import "../../public/globals.css";
import Home from "../components/home-OLD-CONTENT/home";
import Omnie from "@/components/home-OLD-CONTENT/omnie";
import Cennik from "@/components/home-OLD-CONTENT/cennik";
import axios from "axios";

const MainPage = async () => {
  const { data: contentData } = await axios.get(
    "http://localhost:3000/api/content"
  );
  return (
    <>
      <main className="container">
        <Home content={contentData.home} />
        <Omnie content={contentData.omnie} />
        <Cennik content={contentData.cennik} />
      </main>
    </>
  );
};

export default MainPage;
