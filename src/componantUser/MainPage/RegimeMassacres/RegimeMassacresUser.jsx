import React, { useEffect, useState } from 'react'
import './RegimeMassacresUser.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function RegimeMassacresUser() {
  const [ lastNews, setLastNews ] = useState( [] );
  const navigate = useNavigate()
  useEffect(() => {
    async function getAllLastNews() {
      await axios
        .get(
          "https://syrianrevolution1.com/lists/search?category=lastNews&limit=8"
        )
        .then((result) => setLastNews(result?.data))
        .catch((error) => console.log(error));
    }
    getAllLastNews();
  }, []);
  return (
    <>
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {lastNews
              .map((last, i) => (
                <div className="col-md-3" key={i}>
                  <div className="image mb-2">
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.selfImg}`}
                      alt="home"
                      className=" w-100 rounded-3 fimg"
                    />
                  </div>
                  <p>
                    {last.name}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() => navigate(`/newsDetails/${last._id}`)}
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {last?.createdAt && last?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  ); 
}
