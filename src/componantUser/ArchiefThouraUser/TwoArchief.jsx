import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/Context";
export default function TwoArchief() {
  const { lastNews } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <div className="demonstrations py-3">
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="col-md-6">
              <div className="row gy-2">
                {lastNews
                  .filter((e) => e.category === "archiefthoura")
                  .slice(4, 8)
                  .map((e, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="news">
                        <div className="item">
                          <div className="image">
                            <img
                              src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                              alt="mozaharat"
                              className=" w-100 rounded-3"
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
                {lastNews
                  .filter((e) => e.category === "archiefthoura")
                  .map((e, i) => (
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
