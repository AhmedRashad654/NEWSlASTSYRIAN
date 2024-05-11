
import React from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../context/Context";
export default function Liberated() {
  
    const { lastNews } = useUser();


  const navigate = useNavigate();
  return (
    <div id="twoone">
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row gy-3 mb-5">
            <div className="col-md-6 h-100">
              <div className="right h-100">
                <div className="image mb-4">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${
                      lastNews.filter((e) => e.category === "symbols")[0]
                        ?.selfImg
                    }`}
                    alt="symbolThowra"
                    className=" w-100 rounded-3"
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <p>
                    {lastNews.filter((e) => e.category === "symbols")[0]?.name}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3 "
                      onClick={() =>
                        navigate(
                          `/newsDetails/${
                            lastNews.filter((e) => e.category === "symbols")[0]
                              ?._id
                          }`
                        )
                      }
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {lastNews.length > 0 &&
                        lastNews.filter((e) => e.category === "symbols")[0]
                          ?.createdAt.slice(0,10)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row gy-2">
                {lastNews
                  .filter((e) => e.category === "symbols")
                  .slice(0, 4)
                  .map((e, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt="symbolThowra"
                              className=" w-100 rounded-3 fimg"
                            />
                          </div>
                          <div className="text">
                            <p style={{ marginTop: "10px" }}>
                              {e?.name}
                              <br />
                              <button
                                className="btu d-inline-block mx-1 px-3 rounded-3"
                                onClick={() =>
                                  navigate(`/newsDetails/${e?._id}`)
                                }
                              >
                                المزيد
                              </button>
                              <small className="datedSingle">
                                {e?.createdAt && e?.createdAt.slice(0,10)}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
