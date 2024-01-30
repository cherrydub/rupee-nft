import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";

const abbreviateNumber = (value) => {
  const suffixes = ["", "k", "M", "B", "T"];
  let tier = (Math.log10(Math.abs(value)) / 3) | 0;

  if (tier === 0) return value;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledValue = value / scale;

  return scaledValue.toFixed(1) + suffix;
};

function scrollToTop() {
  const nftstufftop = document.getElementById("nftstufftop");
  nftstufftop.scrollIntoView({ behavior: "smooth" });
}

export default function NftStuff({
  nftObj,
  favs,
  setFavs,
  currency,
  timeRange,
  onlyFavs,
  setOnlyFavs,
  searchInput,
  dark,
}) {
  const addFav = (slug, name) => {
    setFavs((prevFavs) => new Set([...prevFavs, slug]));
    toast(`Added ${name} to ⭐️`);
  };

  const removeFav = (slug, name) => {
    const updatedFavs = new Set(favs);
    updatedFavs.delete(slug);
    setFavs(updatedFavs);
    toast(`Removed ${name} from ⭐️`);
  };

  useEffect(() => {
    console.log("the fav list", favs);
  }, [favs]);

  const filteredNftObj = onlyFavs
    ? nftObj.filter((item) => favs.has(item.slug))
    : nftObj;

  return (
    <div id="nftstufftop" className="overflow-x-auto">
      <div
        className="animated-fade fixed bottom-4 right-4 bg-yellow-400 text-black  rounded-full px-2 py-1 cursor-pointer shadow-md transition duration-200 hover:bg-orange-400 hover:pb-4"
        onClick={scrollToTop}
        title="Scroll Up ^"
        style={{ zIndex: "10000" }}
      >
        <i class="las la-arrow-circle-up"></i>
      </div>
      {filteredNftObj ? (
        <div className="flex flex-grow">
          <div className="flex-none">
            <table className="table-auto bg-black  ">
              <thead className="bg-black  ">
                <tr>
                  <th
                    onClick={() => setOnlyFavs((curr) => !curr)}
                    className="w-10 min-w-10 cursor-pointer"
                  >
                    {onlyFavs ? "⭐️" : "☆"}
                  </th>
                  <th className="w-8 min-w-8"></th>
                </tr>
              </thead>
              <tbody>
                {filteredNftObj
                  .filter((item) => item.ranking <= 420)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr key={index}>
                      <td
                        className="w-10 min-w-10 text-center p-0 cursor-pointer "
                        style={{ borderColor: "transparent" }}
                        onClick={() =>
                          favs.has(item.slug)
                            ? removeFav(item.slug, item.name)
                            : addFav(item.slug, item.name)
                        }
                      >
                        <div className="flex">
                          <button
                            className="bg-black"
                            style={{ color: "white" }}
                          >
                            {favs.has(item.slug) ? "⭐️" : "☆"}
                          </button>
                          <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                            {item.ranking < 10
                              ? `0${item.ranking}`
                              : item.ranking}
                          </span>
                        </div>
                      </td>
                      <td
                        className="w-8 min-w-8 text-center p-0"
                        style={{ borderColor: "transparent" }}
                      >
                        <img
                          className="w-7 h-7 border-white rounded border p-0"
                          src={`https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${item.slug}.png%3Fversion%3D6&w=256&q=75`}
                          onError={(e) => {
                            e.target.src =
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
                          }}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="table">
              <thead className="bg-black  ">
                <tr>
                  <th className="w-full text-left">NFT</th>
                  <th className="w-20 min-w-20   text-right">
                    {" "}
                    floor
                    {currency === "Eth" ? (
                      <i className="lab la-ethereum"></i>
                    ) : (
                      <i className="las la-dollar-sign"></i>
                    )}
                  </th>
                  {/* <th className="w-20 min-w-20   text-left">USD</th> */}
                  <th className="w-20 min-w-20   text-right">Mcap</th>
                  <th className="w-20 min-w-20   text-right">
                    change
                    {/* <span style={{ fontSize: "8px" }}>{timeRange}</span> */}
                  </th>

                  <th className="w-20 min-w-20   text-right">
                    sold
                    {/* <span style={{ fontSize: "8px" }}>{timeRange}</span> */}
                  </th>
                  <th className="w-20 min-w-20   text-right">volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredNftObj
                  .filter((item) => item.ranking <= 420)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={
                        dark ? "hover:bg-gray-950" : "hover:bg-gray-100"
                      }
                    >
                      <td
                        className="w-full truncate whitespace-nowrap overflow-hidden px-0"
                        style={{
                          maxWidth: "10rem", // Adjust the max width as needed
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <i className="las la-braille"></i>
                        <span>
                          <a
                            className="hover:underline"
                            href={`https://nftpricefloor.com/${item.slug}`}
                            target="_blank"
                            title={item.name}
                          >
                            {item.name}
                          </a>
                        </span>
                        <div style={{ fontSize: "8px", color: "gray" }}>
                          ---{item.stats.totalSupply}
                        </div>
                      </td>
                      <td className="w-20 min-w-20 text-right">
                        {currency === "Eth" ? (
                          <>
                            {Number(
                              item.stats.floorInfo.currentFloorEth
                            ).toFixed(1)}
                            <i className="lab la-ethereum"></i>
                          </>
                        ) : (
                          <>
                            {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }
                            )}
                            <i className="las la-dollar-sign"></i>
                          </>
                        )}
                      </td>

                      <td className="w-20 min-w-20  text-right">
                        {currency === "Eth" ? (
                          <>
                            {Number(item.stats.floorCapEth).toLocaleString()}
                            <i className="lab la-ethereum"></i>
                          </>
                        ) : (
                          <>
                            {abbreviateNumber(
                              Number(item.stats.floorCapUsd).toFixed(0)
                            )}
                            <i className="las la-dollar-sign"></i>
                          </>
                        )}
                      </td>

                      <td
                        className={`w-20 min-w-20  text-right ${
                          Number(
                            item.stats[`floorTemporality${currency}`][
                              "diff" + timeRange
                            ]
                          ) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {Number(
                          item.stats[`floorTemporality${currency}`][
                            "diff" + timeRange
                          ]
                        ) > 0
                          ? "+"
                          : ""}
                        {Number(
                          item.stats[`floorTemporality${currency}`][
                            "diff" + timeRange
                          ]
                        ).toFixed(2)}
                        %
                      </td>
                      <td className="w-20 min-w-20 text-right">
                        {item.stats.count[`val${timeRange}`]
                          ? item.stats.count[`val${timeRange}`]
                          : "-"}
                      </td>
                      <td className="w-20 min-w-20  text-right">
                        {currency === "Eth" ? (
                          <>
                            {Number(
                              item.stats.salesTemporalityEth.volume[
                                `val${timeRange}`
                              ]
                            ).toLocaleString()}
                            <i className="lab la-ethereum"></i>
                          </>
                        ) : (
                          <>
                            {abbreviateNumber(
                              Number(
                                item.stats.salesTemporalityUsd.volume[
                                  `val${timeRange}`
                                ]
                              ).toFixed(0)
                            )}
                            <i className="las la-dollar-sign"></i>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {console.clear()}
        </div>
      ) : (
        <div>Fetching...</div>
      )}
    </div>
  );
}
