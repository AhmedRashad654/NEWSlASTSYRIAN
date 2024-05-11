import React from 'react'
import './RegimeMassacresUser.css'

import SliderGaraemSystem from "../SliderGaraemSystem";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/Context';
export default function RegimeMassacresUser() {
  const navigate = useNavigate();
  const {masc} =  useUser()   
  return (
    <>
      <section className="regime" style={{ marginBottom: "100px" }} id="fourone">
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {masc
              .filter((e) => e.responsibleAuthority === "system")
              .slice(0, 8)
              .map((e, i) => (
                <div className="col-md-3" key={i}>
                  <div className="image mb-2">
                    <img
                      src={`https://syrianrevolution1.com/postImages/${e.profileImage}`}
                      alt="home"
                      className=" w-100 rounded-3 fimg"
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
                    <small className='datedSingle'>{ e?.createdAt && e?.createdAt.slice(0,10)}</small>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
      <SliderGaraemSystem />
    </>
  ); 
}
