import { useState } from "react";
import styles from "./History.module.css";
import AllHistory from "./AllHistory";
import AdminHistory from "./AdminHistory";
import UserHistory from "./UserHistory";
import HistorySupervisor from "./HistorySupervisor";
import { useUser } from "../../context/Context";

export default function MainHistory() {
  const { role } = useUser();
  const [choice, setChoice] = useState(
    role === "owner"
      ? "all"
      : role === "admin"
      ? "supervisor"
      : role === "supervisor"
      ? "user"
      : ""
  );


  return (
    <div className={styles.MainHistory}>
      <div className={styles.head}>
        <p> سجل الانشطة</p>
      </div>
      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          {role === "owner" ? (
            <span
              className={`${choice === "all" ? styles.active : ""}`}
              onClick={() => setChoice("all")}
            >
              الكل
            </span>
          ) : (
            ""
          )}
          {role === "owner" ? (
            <span
              className={`${choice === "admin" ? styles.active : ""}`}
              onClick={() => setChoice("admin")}
            >
              ادمن
            </span>
          ) : (
            ""
          )}
          {role === "owner" || role === "admin" ? (
            <span
              className={`${choice === "supervisor" ? styles.active : ""}`}
              onClick={() => setChoice("supervisor")}
            >
              مشرفون
            </span>
          ) : (
            ""
          )}

          {role === "owner" || role === "admin" || role === "supervisor" ? (
            <span
              className={`${choice === "user" ? styles.active : ""}`}
              onClick={() => setChoice("user")}
            >
              مستخدمون
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      {choice === "all" && <AllHistory />}
      {choice === "admin" && <AdminHistory />}
      {choice === "supervisor" && <HistorySupervisor />}
      {choice === "user" && <UserHistory />}
    </div>
  );
}
