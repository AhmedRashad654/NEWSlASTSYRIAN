import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LiberatedTwo() {
    const [lastNews, setLastNews] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      async function getAllLastNews() {
        await axios
          .get(
            "https://syrianrevolution1.com/lists/search?category=takrem&limit=5"
          )
          .then((result) => setLastNews(result?.data))
          .catch((error) => console.log(error));
      }
      getAllLastNews();
    }, []);
  return (
    <div id="twotwo">
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row gy-3 mb-5">
            <div className="col-md-6 h-100">
              <div className="right h-100">
                <div className="image mb-4">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${
                      lastNews[0]
                        ?.selfImg
                    }`}
                    alt="symbolThowra"
                    className=" w-100 rounded-3"
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <p>
                    {lastNews.filter((e) => e.category === "takrem")[0]?.name}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() =>
                        navigate(
                          `/newsDetails/${
                            lastNews[0]
                              ?._id
                          }`
                        )
                      }
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {lastNews.length > 0 &&lastNews[0]?.createdAt.slice(0,10)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row gy-2">
                {lastNews.length !== 0 &&
                  lastNews
                    .slice(1, 5)
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
                                  {
                                    e?.createdAt && e?.createdAt.slice(0,10)
                                  }
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














