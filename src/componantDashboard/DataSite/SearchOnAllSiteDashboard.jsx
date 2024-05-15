import React  from 'react'
import styles from '../../styleDashboard/DataDisplaySite.module.css';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function SearchOnAllSiteDashboard({searchDashboard}) {
  const navigate = useNavigate();
  const { listDash, childDash, mascDash } = useUser();
  return (
    <div className={styles.DataSiteLastNews}>
      <div className={styles.allUser}>
        <span
          style={{
            backgroundColor: "#C1D6F2",
            padding: "5px 15px",
            borderRadius: "25px",
            transform: "translate(-40px,20px)",
            display: "inline-block",
          }}
        >
          <FontAwesomeIcon
            style={{ margin: "0 5px" }}
            icon={faMagnifyingGlass}
          />{" "}
          نتائج البحث
        </span>
        <div className={`containerTable`}>
          <table>
            <thead>
              <tr>
                <th> العنوان </th>
                <th>اسم الناشر</th>
                <th> التصنيف</th>
                <th>البيانات المنشورة</th>
              </tr>
            </thead>
            <tbody>
              {listDash
                .filter(
                  (e) =>
                    e?.name.includes(searchDashboard) && e?.isAccepted === true
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user?.user?.username}</td>
                    <td>{user?.category}</td>
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
                ))}
              {childDash
                .filter(
                  (e) =>
                    e?.name.includes(searchDashboard) && e?.isAccepted === true
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user?.user?.username}</td>

                    <td>{user.category}</td>
                    <td>
                      <button
                        className={`add `}
                        style={{ backgroundColor: "#3B9058", color: "white" }}
                        onClick={() => {
                          navigate(
                            `/dashboard/dataChildDisplaySite/${user._id}`
                          );
                        }}
                      >
                        عرض
                      </button>
                    </td>
                  </tr>
                ))}
              {mascDash
                .filter(
                  (e) =>
                    e?.title.includes(searchDashboard) && e?.isAccepted === true
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.title}</td>
                    <td>{user?.user?.username}</td>

                    <td>{user?.category}</td>
                    <td>
                      <button
                        className={`add `}
                        style={{ backgroundColor: "#3B9058", color: "white" }}
                        onClick={() => {
                          navigate(
                            `/dashboard/dataChildDisplaySitemascr/${user._id}`
                          );
                        }}
                      >
                        عرض
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
