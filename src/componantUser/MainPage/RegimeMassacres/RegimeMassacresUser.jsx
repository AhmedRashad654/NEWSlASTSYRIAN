import React from 'react'
import './RegimeMassacresUser.css'
import { useNavigate } from "react-router-dom";
import { useUser } from '../../../context/Context';
export default function RegimeMassacresUser() {
  const navigate = useNavigate()
  const {lastNews} = useUser()
  return (
    <>
      <section className="regime" style={{ marginBottom: "50px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {lastNews
              .filter((e) => e.category === "lastNews")
              .slice(0, 8)
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
