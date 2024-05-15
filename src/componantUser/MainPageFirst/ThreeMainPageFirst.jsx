import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function ThreeMainPageFirst() {
    const [ mascer, setMascer ] = useState( [] );
     const navigate = useNavigate();
      useEffect(() => {
        async function getMascers() {
          await axios
            .get(
              "https://syrianrevolution1.com/massacres/search?responsibleAuthority=system&limit=4"
            )
            .then((result) => {
              setMascer(result.data);
            })
            .catch((error) => console.log(error));
        }
        getMascers();
      }, [] );
   
  return (
    <div>
      <div className="container">
        <div className="header position-relative py-5">
          <h3 className=" text-danger"> الجرائم </h3>
        </div>
      </div>
      <section className="regime" style={{ marginBottom: "100px" }}>
        <div className="container py-2">
          <div className="row gy-3 mb-4">
            {mascer.map((e, i) => (
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
