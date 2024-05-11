import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/Context';

import OneMainPageFirst from './OneMainPageFirst';
export default function MainPageFirst() {
     const [martyr, setMartyr] = useState([]);
     const navigate = useNavigate();
     useEffect(() => {
       async function getMartyr() {
         await axios
           .get("https://syrianrevolution1.com/childData/userView")
           .then((result) => {
             setMartyr(
               result.data.data.filter(
                 (e) =>
                   e.category === "martyr" &&
                   e.responsibleAuthority === "system"
               )
             );
           })
           .catch((error) => console.log(error));
       }
       getMartyr();
     }, [] );
  //////////////////////////////////////////
 const { lastNews } = useUser();
  //////////////////////
    const [mascer, setMascer] = useState([]);
    useEffect(() => {
      async function getMascers() {
        await axios
          .get("https://syrianrevolution1.com/massacres/userView")
          .then((result) => {
            setMascer(
              result.data.data
            );
          }).catch((error)=>console.log(error));
      }
      getMascers();
    }, []);
  return (
    <div>
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> آخر الأخبار </h3>
        </div>
      </div>
      <OneMainPageFirst />
      {/* one section */}
      <section className="martyrs">
        <div className="container py-2">
          <div className="header position-relative py-5">
            <h3 className=" text-danger">الشهداء</h3>
          </div>
          <div className="row gy-3 mb-4">
            {martyr &&
              martyr.slice(0, 4).map((e, i) => (
                <div className="col-md-3" key={i}>
                  <div className="image mb-2">
                    <img
                      src={`https://syrianrevolution1.com/imgData/${e.profileImage}`}
                      alt="martyr"
                      className=" w-100 rounded-3 fimg"
                    />
                  </div>
                  <p>
                    {e?.name ? e?.name : ""}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() => navigate(`/NewsDetailsMartyr/${e._id}`)}
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {e?.createdAt && e?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* two Section  */}
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger">المظاهرات</h3>
        </div>
      </div>
      <div>
        <div className="demonstrations py-3">
          <div className="container">
            <div className="row gy-3 mb-5">
              <div className="col-md-12">
                <div className="row gy-2">
                  {lastNews
                    .filter((e) => e.category === "mozaharat")
                    .slice(0, 4)
                    .map((e, i) => (
                      <div className="col-md-3" key={i}>
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
            </div>
          </div>
        </div>
      </div>
      {/* three section  */}
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger">معارك الثوار</h3>
        </div>
      </div>
      <div>
        <div className="demonstrations py-3">
          <div className="container">
            <div className="row gy-3 mb-5">
              <div className="col-md-12">
                <div className="row gy-2">
                  {lastNews
                    .filter((e) => e.category === "maarek")
                    .slice(0, 4)
                    .map((e, i) => (
                      <div className="col-md-3" key={i}>
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
            </div>
          </div>
        </div>
      </div>
      {/* four section  */}
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> رموز الثورة</h3>
        </div>
      </div>
      <div>
        <div className="demonstrations py-3">
          <div className="container">
            <div className="row gy-3 mb-5">
              <div className="col-md-12">
                <div className="row gy-2">
                  {lastNews
                    .filter((e) => e.category === "symbols")
                    .slice(0, 4)
                    .map((e, i) => (
                      <div className="col-md-3" key={i}>
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
            </div>
          </div>
        </div>
      </div>
      {/* five section  */}
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> الجرائم </h3>
        </div>
      </div>
      <section className="regime" style={{ marginBottom: "100px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {mascer.slice(0, 4).map((e, i) => (
              <div className="col-md-3" key={i}>
                <div className="image mb-2">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${e.profileImage}`}
                    alt="home"
                    className=" w-100 rounded-3 fimg
                    "
                  />
                </div>
                <p>
                  {e?.title ? e?.title : ""}
                  <br />
                  <button
                    className="btu d-inline-block mx-1 px-3 rounded-3"
                    onClick={() => navigate(`/NewsDetailsMascers/${e._id}`)}
                  >
                    المزيد
                  </button>
                  <small className="datedSingle">
                    {e?.createdAt && e?.createdAt.slice(0, 10)}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

