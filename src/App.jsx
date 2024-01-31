import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Toaster, toast } from "sonner";

import NftStuff from "./components/NftStuff";
import AppLayout from "./ui/AppLayout";
import About from "./components/About";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [nftObj, setNftObj] = useState(null);
  const [favs, setFavs] = useState(new Set());
  //eth , usd
  const [currency, setCurrency] = useState("Eth");
  //diff24, diff7d, diff14d, diff30d, diff90d
  const [timeRange, setTimeRange] = useState("24h");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [dark, setDark] = useState(false);
  // const nftApiLink = "nftData.json";
  const nftAPI = import.meta.env.VITE_NFTAPI;

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://nftpricefloor.quickapi.io/api/projects?qapikey=${nftAPI}`
      );
      const { data } = response;
      setNftObj(data);

      setTimeout(() => {
        console.clear();
      }, 5000);
    } catch (error) {
      console.error("Catch error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AppLayout
                currency={currency}
                setCurrency={setCurrency}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                setDark={setDark}
              />
            }
          >
            <Route
              index
              path=""
              element={
                <NftStuff
                  favs={favs}
                  setFavs={setFavs}
                  nftObj={nftObj}
                  setNftObj={setNftObj}
                  currency={currency}
                  timeRange={timeRange}
                  onlyFavs={onlyFavs}
                  setOnlyFavs={setOnlyFavs}
                  dark={dark}
                />
              }
            />
            <Route index path="/about" element={<About />} />
          </Route>
          {
            //anything under here is outside of the applayout
          }
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
