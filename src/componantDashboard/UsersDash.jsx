import styles from "../styleDashboard/SuperVisor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useDashboard } from '../context/DashboardContext';
import {
  faEye,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {ContextUser}  from '../context/Context'
import { useNavigate } from "react-router-dom";
import DisplayTawsec from "./DisplayTawsec";
import axios from "axios";
export default function UsersDash() {
  const [disTawsec, setDisTawsec] = useState();
  const [imageProfile, setImageProfile] = useState("");
  const { getIdConfideint } = useDashboard();
  const [deleted, setDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idTawsek, setIdTawsek] = useState();
  const [openTawsek, setOpenTawsk] = useState(false);
  const [idloading, setIdLoading] = useState(false);
  const [nofile, setFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ report, setReport ] = useState( [] );
  const [searched,setSearched] = useState(false)
  const {
    role,
    getAllUserDashboard,
    onlySupervisor,
    onlyAdmin,
    onlyUser,
    userDashboard,
  } = useContext(ContextUser);
  function handleChangeImageProfile(e) {
    setImageProfile(e.target.files[0]);
  }

  useEffect( () => {
    if ( !searched ) {
    setReport(userDashboard);
      
    }
  }, [searched, userDashboard]);
  useEffect(() => {
    getAllUserDashboard();
  }, [getAllUserDashboard]);

  async function handleTawsek(e) {
    e.preventDefault();
    if (!imageProfile) {
      setFile(true);
      return;
    }
    setFile(false);
    const formData = new FormData();
    formData.append("image", imageProfile);
    setLoading(true);
    await axios
      .patch(`https://syrianrevolution1.com/users/doc/${idTawsek}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setLoading(false);
        if (result.data.user._id) {
          setOpenTawsk("");
          getAllUserDashboard();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  async function deleteUser() {
    try {
      setIdLoading(true);
      const response = await fetch(
        `https://syrianrevolution1.com/users/${idDelete}/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const result = await response.json();
      if (result === "User Deleted Successfully") {
        getAllUserDashboard();

        setIdLoading(false);
        setIdDelete("");
        setDelete("");
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();

  const filter = ( event ) => {
    if ( event.target.value ) {
    setSearched(true);
      
    } else {
    setSearched(false);
      
    }
    setReport(
      userDashboard.filter(
        (f) =>
          f.username.includes(event.target.value) ||
          f.phone.includes(event.target.value)
      )
    );
  };
  return (
    <>
      <div className={styles.SuperVisor}>
        <div className={styles.useruseruser}>
          <div style={{ display: "flex", gap: "10px" }}>
            <p>المستخدمون/</p>
            <div>
              <span
                className={styles.spanradiues}
                style={{
                  backgroundColor: "yellow",
                  cursor: "pointer",
                }}
              ></span>
              <small> انتظار </small>
            </div>
            <div>
              <span
                className={styles.spanradiues}
                style={{
                  backgroundColor: "red",
                  cursor: "pointer",
                }}
              ></span>
              <small> غير موثق </small>
            </div>
            <div>
              <span
                className={styles.spanradiues}
                style={{
                  backgroundColor: "green",
                  cursor: "pointer",
                }}
              ></span>
              <small> موثق </small>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              transform: "translatey(1px)",
            }}
            className={styles.youseef}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <p>عدد المستخدمين</p>
              <span className={styles.counter}>{onlyUser}</span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <p>عدد المشرفين</p>
              <span className={styles.counter}>{onlySupervisor}</span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <p>عدد المديرين</p>
              <span className={styles.counter}>{onlyAdmin}</span>
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.sd} />
          <input
            className="form-control"
            placeholder="بحث باستخدام الاسم"
            type="text"
            onChange={filter}
          />
        </div>
        <div className={styles.allUser}>
          <div className={styles.containerTable}>
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>رقم الهاتف</th>
                  <th>الدور</th>

                  <th>توثيق الحساب</th>

                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {report &&
                  report.map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        {user?.isConfident === true && user?.docImg !== null ? (
                          <span
                            className={styles.spanradiues}
                            style={{ backgroundColor: "green" }}
                          ></span>
                        ) : user?.docImg !== "" &&
                          user?.isConfident === false ? (
                          <span
                            className={styles.spanradiues}
                            style={{
                              backgroundColor: "yellow",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setDisTawsec("taws");
                              getIdConfideint(user._id);
                            }}
                          ></span>
                        ) : (
                          <span
                            className={styles.spanradiues}
                            style={{
                              backgroundColor: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setOpenTawsk(true);
                              setIdTawsek(user._id);
                            }}
                          ></span>
                        )}
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="bg-danger p-1 text-white"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setIdDelete(user._id);
                            if (user?.role === "owner") {
                              if (role === "owner") {
                                setDelete(true);
                              } else {
                                return alert("لا يمكنك حذف هذا الحساب");
                              }
                            }
                            if (user?.role === "admin") {
                              if (role === "owner") {
                                setDelete(true);
                              } else if (
                                role === "admin" &&
                                user?._id ===
                                  localStorage.getItem("idUserLogin")
                              ) {
                                setDelete(true);
                              } else {
                                return alert("لا يمكنك حذف هذا الحساب");
                              }
                            }
                            if (
                              user?.role === "user" ||
                              user?.role === "supervisor"
                            ) {
                              setDelete(true);
                            }
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="bg-primary p-1 text-white"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("IdUpdateUser", user._id);
                            if (user?.role === "owner") {
                              if (role === "owner") {
                                navigate("/dashboard/updateuser");
                              } else {
                                return alert("لا يمكنك التعديل علي هذا الحساب");
                              }
                            }

                            if (user?.role === "admin") {
                              if (role === "owner") {
                                navigate("/dashboard/updateuser");
                              } else if (
                                role === "admin" &&
                                user?._id ===
                                  localStorage.getItem("idUserLogin")
                              ) {
                                navigate("/dashboard/updateuser");
                              } else {
                                return alert("لا يمكنك التعديل علي هذا الحساب");
                              }
                            }
                            if (
                              user?.role === "user" ||
                              user?.role === "supervisor"
                            ) {
                              navigate("/dashboard/updateuser");
                            }
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ cursor: "pointer" }}
                          className="bg-primary p-1 text-white"
                          onClick={() =>
                            navigate(`/dashboard/singleUser/${user._id}`)
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className={`${styles.add} btn btn-success`}
          onClick={() => navigate("/dashboard/adduser")}
        >
          اضافة مستخدم
        </button>
        {disTawsec === "taws" && (
          <DisplayTawsec
            setDisTawsec={setDisTawsec}
            getAllUserDashboard={getAllUserDashboard}
          />
        )}
        {openTawsek && (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "#00011C80",
              top: 0,
              left: 0,
            }}
          >
            <div
              className="gh"
              style={{
                padding: "30px 10px",
                width: "40%",
                height: "35%",
                transform: "translateY(150px)",
                backgroundColor: "#F7F7F7",
                borderRadius: "5px",
                margin: "auto",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                ارفع صورة الوثيقة
              </p>
              {nofile && (
                <p
                  className="alert alert-secondary alerthemself"
                  style={{ transform: "translateY(-10px)", width: "100%" }}
                >
                  يرجي رفع الوثيقة
                </p>
              )}
              <label htmlFor="file-upload2" className={`customfileupload`}>
                ارفع الملف
              </label>
              <input
                name="selfImg"
                id="file-upload2"
                type="file"
                className="form-control"
                onChange={handleChangeImageProfile}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "50%",
                  transform: "translatex(-50%)",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <button className="btn btn-danger" onClick={handleTawsek}>
                  {loading ? (
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    " توثيق"
                  )}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setOpenTawsk("")}
                >
                  الغاء
                </button>
              </div>
            </div>
          </div>
        )}
        {deleted && (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "#00011C80",
              top: 0,
              left: 0,
            }}
          >
            <div
              className="gh"
              style={{
                width: "40%",
                height: "45%",
                transform: "translateY(70px)",
                backgroundColor: "#F7F7F7",
                borderRadius: "5px",
                margin: "auto",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  transform: "translatey(50px)",
                  fontSize: "20px",
                }}
              >
                هل انت متاكد من رغبتك <br /> بحذف هذا المستخدم
              </p>
              <div
                style={{
                  position: "absolute",
                  bottom: "5%",
                  left: "50%",
                  transform: "translatex(-50%)",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <button className="btn btn-danger" onClick={deleteUser}>
                  {idloading ? (
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    >
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    " حذف"
                  )}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setDelete("")}
                >
                  الغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
