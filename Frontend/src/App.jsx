import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-2 h-full">
      <div className="flex flex-col gap-y-20 justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
