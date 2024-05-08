import React, { useState } from "react";
import './Footer.css'
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { useUser } from "../../context/Context";
import CopyToClipboard from "react-copy-to-clipboard";
export default function Footer() {
  const { messageAndPaypal } = useUser()
 const [copied ,setCopied] = useState(false)
  return (
    <>
      <div className="footer pt-5 pb-3 ">
        <div className="container">
          <h3 className="mb-4">الثورة السورية</h3>
          <div className="row gy-4">
            <div className="col-md-5">
              <div className="row gy-3">
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/">
                    الرئيسية
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/symbolthourauser">
                    رموز الثورة
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/graamsystem">
                    جرائم النظام
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/lastNews">
                    أخر الاخبار
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/blacklistuser">
                    القائمة السوداء
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/graemqasad">
                    جرائم قسد
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/archiefthoura">
                    أرشيف الثورة
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/blacklistuser">
                    مجرمي الحرب
                  </NavLink>
                </div>
                <div className="col-md-4 col-sm-4 x-sm">
                  <NavLink className="nav-link" to="/graemdashuser">
                    جرائم داعش
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <div className="contact-footer text-center">
                <p className=" para mb-3 p-0">تواصل معنا</p>
                <div className="social-icons-footer d-flex align-items-center">
                  <a
                    href="https://api.whatsapp.com/send/?phone=4917676000731"
                    className="text-white"
                  >
                    {" "}
                    <i className="fa-brands fa-whatsapp ms-3"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/syrian.revolution7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-instagram ms-3"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@syrian.revolution7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-tiktok ms-3"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/Syrian7Revolution"
                    className="text-white"
                  >
                    <i className="fa-brands fa-square-facebook ms-3"></i>
                  </a>
                  <a
                    href="https://twitter.com/syrian_revolut7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-square-twitter ms-3"></i>
                  </a>
                  {/* ///////////////////// */}
                  <a
                    href="https://youtube.com/@syrian.revolution7"
                    className="text-white"
                  >
                    <i className="fa-brands fa-square-youtube ms-3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <div className="contact-footer text-center">
                <p className=" para mb-3 p-0"> تثبيت التطبيق</p>
                <div
                  className="social-icons-footer d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <a
                    href={
                      messageAndPaypal.filter(
                        (e) => e.category === "android"
                      )[0]?.content
                    }
                  >
                    <button
                      className="btn oda"
                      style={{ border: "2px solid white", color: "white" }}
                    >
                      اندرويد
                    </button>
                  </a>
                  <a
                    href={
                      messageAndPaypal.filter(
                        (e) => e.category === "desktop"
                      )[0]?.content
                    }
                  >
                    <button
                      className="btn"
                      style={{ border: "2px solid white", color: "white" }}
                    >
                      ايفون
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <div className="contact-footer text-center">
                <p className=" para mb-3 p-0">
                  {" "}
                  ادعم موقعنا لنستمر بالتطوير وتقديم رسالتنا (تبرع الان)
                </p>
                {copied && <p style={{ fontSize: "10px" }}>تم نسخ الرابط</p>}
                <div
                  className="social-icons-footer d-flex align-items-center"
                  style={{
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {messageAndPaypal
                      .filter((e) => e.category === "paypal")
                      .map((e, i) => (
                        <CopyToClipboard
                          text={e?.content}
                          onCopy={() => setCopied(true)}
                        >
                          <div key={i}>
                            <p
                              href={e.content}
                              style={{
                                textDecoration: "none",
                                fontSize: "13px",
                                cursor: "pointer",
                              }}
                            >
                              {e.content}
                            </p>
                            <br />
                          </div>
                        </CopyToClipboard>
                      ))}
                  </div>

                  <FontAwesomeIcon
                    icon={faPaypal}
                    style={{ fontSize: "25px", marginTop: "-30px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className=" para text-center p-0 m-0">
            جميع حقوق النشر محفوظة -
            <Link to="privacypolicy" style={{ textDecoration: "none" }}>
              سياسة الخصوصية{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}











