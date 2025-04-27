import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AllRoutes from "./routes/AllRoutes";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);
  return <AllRoutes />;
}

export default App;
