import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function FourMainPageFirst() {
    const navigate = useNavigate()
    const [ mozaharat, setMozaharat ] = useState( [] )
      useEffect(() => {
        async function getAllLastNews() {
          await axios
            .get(
              "https://syrianrevolution1.com/lists/search?category=mozaharat&limit=4"
            )
            .then((result) => setMozaharat(result?.data))
            .catch((error) => console.log(error));
        }
        getAllLastNews();
      }, []);
  return (
    <div>
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
                  {mozaharat
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
    </div>
  );
}
