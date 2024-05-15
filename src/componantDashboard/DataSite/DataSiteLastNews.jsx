import React  from 'react'
import styles from '../../styleDashboard/DataDisplaySite.module.css';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/Context';
export default function DataSiteLastNews() {
  const navigate = useNavigate();
  const { listDash } = useUser();
  return (
    <div className={styles.DataSiteLastNews}>
      <div className={styles.allUser}>
        <div className={`containerTable`}>
          <table>
            <thead>
              <tr>
                <th> عنوان الخبر</th>
                <th>اسم الناشر</th>
                <th>البيانات المنشورة</th>
              </tr>
            </thead>
            <tbody>
              {listDash &&
                listDash
                  .filter((e) => e?.isAccepted === true).map((user, index) =>
                  user.category === "lastNews" ? (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user?.user?.username}</td>

                      <td>
                        <button
                          className={`add `}
                          style={{ backgroundColor: "#3B9058", color: "white" }}
                          onClick={() => {
                            navigate(`/dashboard/dataDisplaySite/${user._id}`);
                          }}
                        >
                          عرض
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
