import React from "react";
import styles from "../styleDashboard/UpdateSuperVisor.module.css"
import { useNavigate } from "react-router-dom";

export default function UpdateSupervisors() {
  const navigate = useNavigate();

  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>المشرفون / تحديث بيانات</p>
      </div>
      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor="">اسم المشرف</label>
              <input
                type="text"
                placeholder="اسم المشرف"
                className="form-control"
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> رقم الهاتف</label>
              <input
                type="text"
                placeholder=" رقم الهاتف"
                className="form-control"
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> المحافظة</label>
              <input
                type="text"
                placeholder=" المحافظة "
                className="form-control"
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={ styles.inp1 }>
              <p style={{fontSize:"12px"}}></p>
              <label htmlFor="fa" className={`customfileupload`}>
                {" "}
              ارفع الملف
              </label>
              <input
                id="fa"
                type="file"
                placeholder="  وثيقة اثبات الهوية"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </form>
      <div className={styles.btnbottom}>
        <button
          className={`add`}
          style={{ color: "white", backgroundColor: "green" }}
        >
          تحديث
        </button>
        <button
          className={`add`}
          style={{ border: "1px solid red", color: "red" }}
          onClick={() => navigate(-1)}
        >
          الغاء
        </button>
      </div>
    </div>
  );
}
