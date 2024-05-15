import React from 'react';
import style from '../styleDashboard/MartyrsDash.module.css';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/Context';
export default function DetaineesDash() {
  const navigate = useNavigate();
   const { childDash } = useUser();
  return (
    <div className={style.MartyrsDash}>
      <div className={`headDashboard`}>
        <p>البيانات المستلمة / معتقلين</p>
      </div>
      <div className={`containerTable`}>
        <table>
          <thead>
            <tr>
              <th>اسم المعتقل</th>
              <th>اسم الناشر</th>

              <th>البيانات المرفوعة</th>
            </tr>
          </thead>
          <tbody>
            {childDash.map((user, index) =>
              user.category === "adetaine" && user.isAccepted === false ? (
                <tr key={index}>
                  <td>{user.name} </td>
                  <td>{user?.user?.username} </td>

                  <td>
                    <button
                      className={`add `}
                      style={{ backgroundColor: "#3B9058", color: "white" }}
                      onClick={() => {
                        navigate(`/dashboard/detaineesdash/${user._id}`);
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
  );
}
