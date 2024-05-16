import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
export default function OneArchief() {
  const navigate = useNavigate();

  function getAllLastNews() {
    return axios.get(
      "https://syrianrevolution1.com/lists/search?category=archiefthoura&limit=5"
    );
  }
  getAllLastNews();
  const { data } = useQuery("archief", getAllLastNews, {
    cacheTime: 900000,
  });
  return (
    <div id="oneoneone">
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row gy-3 mb-5">
            <div className="col-md-6 h-100">
              <div className="right h-100">
                <div className="image mb-4">
                  <img
                    src={`https://syrianrevolution1.com/postImages/${data?.data[0]?.selfImg}`}
                    alt="mozaharat"
                    className=" w-100 rounded-3 gimg"
                    fetchPriority="high"
                  />
                </div>
                <div className="info">
                  <p>
                    {data?.data[0]?.name}
                    <br />

                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() =>
                        navigate(`/newsDetails/${data?.data[0]?._id}`)
                      }
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">
                      {data?.data.length > 0 &&
                        data?.data[0]?.createdAt.slice(0, 10)}
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row gy-2">
                {data?.data.length > 0 &&
                  data?.data.slice(1, 5).map((e, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt="mozaharat"
                              className=" w-100 rounded-3 fimg"
                              fetchPriority="high"
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
  );
}
