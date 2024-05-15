import styles from '../../styleDashboard/DataDisplaySite.module.css';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/Context';
export default function DataSiteSymbol() {
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
                <th> اسم الناشر</th>

                <th>التصنيف</th>
                <th>البيانات المنشورة</th>
              </tr>
            </thead>
            <tbody>
              {listDash &&
                listDash
                  .filter((e) => e?.isAccepted === true)
                  .map((user, index) =>
                    user.category === "symbols" ? (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user?.user?.username}</td>

                        <td>{user.category}</td>
                        <td>
                          <button
                            className={`add `}
                            style={{
                              backgroundColor: "#3B9058",
                              color: "white",
                            }}
                            onClick={() => {
                              navigate(
                                `/dashboard/dataDisplaySite/${user._id}`
                              );
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
              {listDash &&
                listDash
                  .filter((e) => e?.isAccepted === true)
                  .map((user, index) =>
                    user.category === "takrem" ? (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.category}</td>
                        <td>
                          <button
                            className={`add `}
                            style={{
                              backgroundColor: "#3B9058",
                              color: "white",
                            }}
                            onClick={() => {
                              navigate(
                                `/dashboard/dataDisplaySite/${user._id}`
                              );
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
