import React, { useState, useContext, useEffect } from "react";
import "./MainNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../RegisterUser/RegisterUser.module.css";
import RegisterUser from "../RegisterUser/RegisterUser";
import LoginUser from "../LoginUser/LoginUser";
import { ContextUser } from "../../context/Context";
import SuccessRegister from "../SuccessRegister/SuccessRegister";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import { faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import RestNewPassword from "../ResetNewPassword/RestNewPassword";
import imgone from "../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
import UpdateLogin from "../UpdateLogin";

import { useNavigate } from "react-router-dom";
export default function MainNav() {
  const [open, setOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const {
    openAuth,
    setOpenAuth,
    numberDate,
    notificationData,
    getAllNotificationDate,
    notification,
    getNotification,
    number,
  } = useContext(ContextUser);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotification();
    }
  }, [getNotification]);

  useEffect(() => {
    getAllNotificationDate();
  }, [getAllNotificationDate]);
  //////////////////////////////////////////
  const handleSelectChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "option1":
        navigate("/searchlist");
        break;
      case "option2":
        navigate("/searchchild");
        break;
      case "option3":
        navigate("/searchmascers");
        break;
      default:
        break;
    }
  };
  
  return (
    <>
      <div className="container">
        <div className="row py-3 gy-3  " style={{ alignItems: "center" }}>
          <div className="col-md-4 d-flex justify-content-between align-items-center">
            <h1 className="m-0 h4">الثورة السورية</h1>
          </div>
          <div
            className="col-md-8 iop"
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div className=" contact d-flex justify-content-between align-items-center">
              {open === true ? (
                <div className="social-icons d-flex align-items-center ms-5 p-2 text-white ">
                  <a
                    href="https://api.whatsapp.com/send/?phone=4917676000731"
                    className="text-white"
                  >
                    {" "}
                    <i className="fa-brands fa-whatsapp ms-2"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/syrian.revolution7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-instagram ms-2"></i>
                  </a>
                  <a
                    href="https://t.me/Syrian_Revolution7"
                    className="text-white"
                  >
                    <i class="fa-brands fa-telegram ms-2"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@syrian.revolution7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-tiktok ms-2"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/Syrian7Revolution"
                    className="text-white"
                  >
                    <i className="fa-brands fa-square-facebook ms-2"></i>
                  </a>
                  <a
                    href="https://twitter.com/syrian_revolut7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-square-twitter ms-2"></i>
                  </a>

                  <a
                    href="https://youtube.com/@syrian.revolution7"
                    className="text-white"
                  >
                    <i class="fa-brands fa-square-youtube ms-2"></i>
                  </a>

                  <i
                    className="fa-regular fa-circle-xmark text-danger close"
                    onClick={() => setOpen(false)}
                  ></i>
                </div>
              ) : null}
              <p className="m-0 p-3 p-0 btn" onClick={() => setOpen(true)}>
                تواصل معنا
              </p>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", right: "-8px" }}>
                  {numberDate && number ? numberDate + number : ""}
                </span>
                <div
                  className="notification position-relative"
                  onClick={() => setOpenNoti(true)}
                >
                  <i className="fa-regular fa-bell me-2"></i>
                </div>
              </div>
            </div>
            <div className="uio">
              <select
                className="form-control"
                style={{ width: "100%" }}
                onChange={handleSelectChange}
              >
                <option>ابحث عن</option>
                <option value="option1">
                  {" "}
                  اخر الاخبار و الارشيف و الرموز والخونة
                </option>
                <option value="option2">
                  {" "}
                  الثهداء و المعتقلين و المفقودين
                </option>

                <option value="option3"> الجرائم</option>
              </select>
            </div>
            <div className="   search d-flex justify-content-between align-items-center position-relative">
              {localStorage.getItem("token") ? (
                <div
                  className="buttons d-flex align-items-center gap-2 me-auto "
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  {localStorage?.selfImg !== undefined &&
                  localStorage?.selfImg !== "undefined" &&
                  localStorage?.selfImg !== null &&
                  localStorage?.selfImg !== "" ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${localStorage?.selfImg}`}
                      alt="himself"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenAuth("update")}
                    />
                  ) : (
                    <img
                      src={imgone}
                      alt="himself"
                      style={{
                        width: "40px",
                        borderRadius: "40%",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenAuth("update")}
                    />
                  )}

                  <button
                    onClick={handleLogout}
                    className="btn btn-create"
                    style={{ height: "30px", fontSize: "10px", width: "100px" }}
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="buttons d-flex align-items-center gap-2 me-auto ">
                  <button
                    className="btn btn-create"
                    onClick={() => setOpenAuth("register")}
                  >
                    انشاء حساب
                  </button>
                  <button
                    className="btn btn-login"
                    onClick={() => setOpenAuth("login")}
                  >
                    تسجيل الدخول
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {openNoti ? (
          <div className={style.RegisterUser}>
            <div className={style.forms}>
              <div
                className={style.headForm}
                onClick={() => setOpenNoti(false)}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{
                    position: "absolute",
                    top: "-20%",
                    right: "5px",
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="notification-body p-3">
                <div className="new">
                  <h4 className="text-danger">
                    <span>
                      <i className="fa-regular fa-bell ms-2 mb-2"></i>
                    </span>{" "}
                    الإشعارات الجديدة
                  </h4>
                  {notificationData &&
                    notificationData.length > 0 &&
                    notificationData
                      .filter((e) => e?.data?.isAccepted === true)

                      .map((e) => (
                        <p
                          className="  note position-relative bg-white p-2 pe-5 m-0 mb-2"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <small> تمت اضافة منشور جديد بعنوان </small>
                            <small style={{ color: "#2d2dc3" }}>
                              {e?.type === "add child data post"
                                ? e?.data?.name.slice(0, 60)
                                : e?.type === "add list data post"
                                ? e?.data?.name.slice(0, 60)
                                : e?.type === "add massacres data post"
                                ? e?.data?.title.slice(0, 60)
                                : ""}
                            </small>
                            <small>
                              {" "}
                              (
                              {e?.data?.category === "lastNews"
                                ? "اخر الاخبار"
                                : e?.data?.category === "archiefthoura"
                                ? "ارشيف الثورة"
                                : e?.data?.category === "mozaharat"
                                ? "المظاهرات"
                                : e?.data?.category === "maarek"
                                ? "معارك الثوار"
                                : e?.data?.category === "symbols"
                                ? "رموز الثورة"
                                : e?.data?.category === "takrem"
                                ? "بطاقات التكريم"
                                : e?.data?.category === "blacklist"
                                ? "القائمة السوداء"
                                : e?.data?.category === "Traitors"
                                ? "الخونة"
                                : e?.data?.category === "mogramharb"
                                ? "مجرمين الحرب"
                                : e?.type === "add massacres data post"
                                ? "جرائم"
                                : e?.data?.category === "martyr"
                                ? "الشهداء"
                                : e?.data?.category === "adetaine"
                                ? "المعتقلين"
                                : e?.data?.category === "missing"
                                ? "المفقودين"
                                : ""}{" "}
                              ){" "}
                            </small>
                          </span>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              <>
                                {e?.type === "add child data post"
                                  ? navigate(
                                      `/NewsDetailsMartyr/${e?.data?._id}`
                                    )
                                  : e?.type === "add list data post"
                                  ? navigate(`/newsDetails/${e?.data?._id}`)
                                  : e?.type === "add massacres data post"
                                  ? navigate(
                                      `/NewsDetailsMascers/${e?.data?._id}`
                                    )
                                  : ""}
                                {setOpenNoti(false)}
                              </>;
                            }}
                          />
                        </p>
                      ))}
                  {notification?.child && notification?.child?.length > 0
                    ? notification?.child
                        .slice()
                        .reverse()
                        .map((e) => (
                          <p className="  note position-relative bg-white p-2 pe-5 m-0 mb-2">
                            {e?.notification}
                          </p>
                        ))
                    : ""}
                  {notification?.lists && notification?.lists?.length > 0
                    ? notification?.lists
                        .slice()
                        .reverse()
                        .map((e) => (
                          <p className=" note position-relative bg-white p-2 pe-5 m-0 mb-2">
                            {e?.notification}
                          </p>
                        ))
                    : ""}
                  {notification?.massacres &&
                  notification?.massacres?.length > 0
                    ? notification?.massacres
                        .slice()
                        .reverse()
                        .map((e) => (
                          <p className="note  position-relative bg-white p-2 pe-5 m-0 mb-2">
                            {e?.notification}
                          </p>
                        ))
                    : ""}
                  <p className=" note position-relative bg-white p-2 pe-5 m-0 mb-2">
                    {notification ? notification?.notification : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {openAuth === "register" && <RegisterUser />}
      {openAuth === "login" && <LoginUser />}
      {openAuth === "successRegister" && <SuccessRegister />}
      {openAuth === "forget" && <ForgetPassword />}
      {openAuth === "rest" && <RestNewPassword />}
      {openAuth === "return" && <RestNewPassword />}
      {openAuth === "update" && <UpdateLogin />}
    </>
  );
}
