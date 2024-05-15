import axios from 'axios';
import React, { useEffect, useState }  from 'react'

import { useNavigate } from 'react-router-dom'

export default function FlagArchief() {
 const [lastNews, setLastNews] = useState([]);
 const navigate = useNavigate();
 useEffect(() => {
   async function getAllLastNews() {
     await axios
       .get(
         "https://syrianrevolution1.com/lists/search?category=mozaharat&page=2&limit=4"
       )
       .then((result) => setLastNews(result?.data))
       .catch((error) => console.log(error));
   }
   getAllLastNews();
 }, []);
 //////////////////////////
 const [alllastNews, setallLastNews] = useState([]);
 useEffect(() => {
   async function getAllLastNews() {
     await axios
       .get(
         "https://syrianrevolution1.com/lists/search?category=mozaharat&page=3&limit=10"
       )
       .then((result) => setallLastNews(result?.data))
       .catch((error) => console.log(error));
   }
   getAllLastNews();
 }, []);
  return (
    <div id="onetwo">
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="col-md-6">
              <div className="row gy-2">
                {lastNews.length > 0 && lastNews.map((e, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="news">
                      <div className="item">
                        <div className="image">
                          <img
                            src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                            alt="mozaharat"
                            className=" w-100 rounded-3 fimg"
                          />
                        </div>
                        <div className="text">
                          <p>
                            {e?.name}
                            <br />
                            <button
                              className="btu d-inline-block mx-1 px-3 rounded-3"
                              onClick={() => navigate(`/newsDetails/${e._id}`)}
                            >
                              المزيد
                            </button>
                            <small className="datedSingle">
                              {e?.createdAt && e?.createdAt.slice(0, 10)}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lastSlider col-md-5">
              <div className=" muted p-2 overflow-hidden">
                {alllastNews.map((e, i) => (
                  <div
                    className="row border-bottom pb-2 pt-2 border-2 overflow-hidden"
                    style={{ backgroundColor: "#ECECEC" }}
                    key={i}
                  >
                    <div className="col-md-4">
                      <img
                        src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                        alt="lastNews"
                        className="w-100"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>
                        {e?.name}
                        <br />
                        <button
                          className="btu d-inline-block mx-1 px-3 rounded-3"
                          onClick={() => navigate(`/newsDetails/${e._id}`)}
                        >
                          المزيد
                        </button>
                        <small className="datedSingle">
                          {e?.createdAt && e?.createdAt.slice(0, 10)}
                        </small>
                      </p>
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



