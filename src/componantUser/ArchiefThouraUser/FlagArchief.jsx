import axios from 'axios';
import React  from 'react'
import { useQuery } from 'react-query';

import { useNavigate } from 'react-router-dom'

export default function FlagArchief() {

 const navigate = useNavigate();

   function getAllLastNews() {
   return axios
       .get(
         "https://syrianrevolution1.com/lists/search?category=mozaharat&page=2&limit=4"
       )
  }
  const {data:data1} = useQuery('one65',getAllLastNews)
  

 //////////////////////////


 function getAllLastNews1() {
    return axios
       .get(
         "https://syrianrevolution1.com/lists/search?category=mozaharat&page=3&limit=10"
       )
   
   }
  const { data: data2 } = useQuery( "teo654", getAllLastNews1, {
    cacheTime:1800000
  });


  return (
    <div id="onetwo">
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="col-md-6">
              <div className="row gy-2">
                {data1?.data.length > 0 &&
                  data1?.data.map((e, i) => (
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
                                onClick={() =>
                                  navigate(`/newsDetails/${e._id}`)
                                }
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
                {data2?.data.map((e, i) => (
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



