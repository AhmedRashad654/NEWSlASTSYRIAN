import { useState } from "react";
import styles from "../styleDashboard/AddSuperVisor.module.css";
import axios from "axios";
import Joi from "joi";
import { useUser } from "../context/Context";
export default function PaypalDashboard() {
  const [openAdd, setOpenAdd] = useState(false);
  const [message, setMessage] = useState({ category: "paypal" });
  const [messageUPdate, setMessageUpdate] = useState({ category: "paypal" });
  const [loadingAdd, setLodingAdd] = useState(false);
  const [loadingUpdate, setLodingUpdate] = useState(false);
  const [errorListUser, setErrorListUser] = useState([]);
  const [errorListUserUpdate, setErrorListUserUpdate] = useState([]);
  const [idUpdatePaypal, setIdUpdatePaypal] = useState();
  const [openUpdate, setOpenUpdate] = useState(false);
  const { messageAndPaypal, getAllMessageAndPaypal } = useUser();

  /////////////////////////////////////////////////////
  /////////////////////////////validation paypal add/////////////////
  function validationAddUser() {
    let schema = Joi.object({
      category: Joi.string().required(),
      content: Joi.string().required().messages({
        "string.empty": "   الحساب مطلوب",
        "any.required": "   الحساب مطلوب",
      }),
    });
    return schema.validate(message, { abortEarly: false });
  }
  /////////////////////handle add paypal///////////////
  async function handleSubmit(e) {
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser("");
      setLodingAdd(true);
      await axios
        .post(
          `https://syrianrevolution1.com/messagePaypal/add/${localStorage.getItem(
            "idUserLogin"
          )}`,
          message,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          if (result.data.success === "MessagePaypal added successfully") {
            setLodingAdd(false);
              setOpenAdd( false );
              getAllMessageAndPaypal()
          }
        })
        .catch((error) => {
          setLodingAdd(false);
          console.log(error);
        });
    }
  }
  //////////////////////get single paypal////////////////
  async function getSinglePaypal(id) {
    await axios
      .get(`https://syrianrevolution1.com/messagePaypal/${id}`)
      .then((result) => {
        setMessageUpdate({
          category: "paypal",
          content: result.data.content || "",
        });
      })
      .catch((error) => console.log(error));
  }
  ///////////////////////////validation paypal update/////////////////
  function validationUPdatePaypal() {
    let schema = Joi.object({
      category: Joi.string().required(),
      content: Joi.string().required().messages({
        "string.empty": "   الحساب المعدل مطلوب",
        "any.required": "   الحساب المعدل مطلوب",
      }),
    });
    return schema.validate(messageUPdate, { abortEarly: false });
  }
  /////////////////////handle add paypal///////////////
  async function handleSubmitUPdate(e) {
    e.preventDefault();
    let responseValidateUser = validationUPdatePaypal();
    if (responseValidateUser.error) {
      setErrorListUserUpdate([responseValidateUser.error.details]);
    } else {
      setErrorListUserUpdate("");
      setLodingUpdate(true);
      await axios
        .patch(
          `https://syrianrevolution1.com/messagePaypal/${idUpdatePaypal}/${localStorage.getItem(
            "idUserLogin"
          )}`,
          messageUPdate,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
          if (result?.data?.data?._id) {
            setLodingUpdate(false);
            setOpenUpdate(false);
            setIdUpdatePaypal("");
            getAllMessageAndPaypal();
          }
        })
        .catch((error) => {
          setLodingUpdate(false);
          console.log(error);
        });
    }
  }
  ////////////////////handle delete paypal///////////////
  async function handleDeletePaypal(id) {
    await axios
      .delete(
        `https://syrianrevolution1.com/messagePaypal/${id}/${localStorage.getItem(
          "idUserLogin"
          )}`, {
              headers: {
                Authorization:localStorage.getItem('token')
            }
        }
      )
        .then( ( result ) => {
            if ( result.data === "MessagePaypal Deleted Successfully" ) {
              getAllMessageAndPaypal()
          }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p> حساب بيبال</p>
      </div>

      <div className={styles.containerTable}>
        <table>
          <thead>
            <tr>
              <th>الحساب</th>
              <th> الحالة</th>
            </tr>
          </thead>
          <tbody>
            {messageAndPaypal &&
              messageAndPaypal
                .filter((e) => e.category === "paypal")
                .map((e, i) => (
                  <tr key={i}>
                    <td>{e?.content}</td>
                    <td>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="btn btn-danger"
                        onClick={() => handleDeletePaypal(e?._id)}
                      >
                        حذف
                      </button>

                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setOpenUpdate(true);
                          setIdUpdatePaypal(e?._id);
                          getSinglePaypal(e?._id);
                        }}
                      >
                        تعديل
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <button
          className={`${styles.add} btn btn-success`}
          onClick={() => setOpenAdd(true)}
        >
          اضافة حساب جديد
        </button>
      </div>

      {/* ////////////////////// */}
      {/* ///////////////////////////// */}
      {/* ////////////////////////// */}
      {/* ///////////////////// */}
      {/* ///////////////////////////// */}
      {openAdd && (
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
              height: "38%",
              transform: "translateY(150px)",
              backgroundColor: "#F7F7F7",
              borderRadius: "5px",
              margin: "auto",
            }}
          >
            {errorListUser &&
              errorListUser.map((error, index) => (
                <p
                  key={index}
                  className="alert alert-secondary alerthemself"
                  style={{ transform: "translatey(-10px)", width: "100%" }}
                >
                  {error[index].message}
                </p>
              ))}
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              اضافة الحساب
            </p>

            <input
              placeholder="حساب بيبال"
              type="text"
              className="form-control"
              onChange={(e) =>
                setMessage((prevState) => ({
                  ...prevState,
                  content: e.target.value,
                }))
              }
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
              <button className="btn btn-danger" onClick={handleSubmit}>
                {loadingAdd ? (
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "اضافة"
                )}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setOpenAdd(false);
                  setErrorListUser("");
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ////////////////////// */}
      {/* ///////////////////////////// */}
      {/* ////////////////////////// */}
      {/* ///////////////////// */}
      {/* ///////////////////////////// */}
      {openUpdate && (
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
              height: "38%",
              transform: "translateY(150px)",
              backgroundColor: "#F7F7F7",
              borderRadius: "5px",
              margin: "auto",
            }}
          >
            {errorListUserUpdate &&
              errorListUserUpdate.map((error, index) => (
                <p
                  key={index}
                  className="alert alert-secondary alerthemself"
                  style={{ transform: "translatey(-10px)", width: "100%" }}
                >
                  {error[index].message}
                </p>
              ))}
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              تعديل الحساب
            </p>

            <input
              placeholder="حساب بيبال"
              type="text"
              className="form-control"
              onChange={(e) =>
                setMessageUpdate((prevState) => ({
                  ...prevState,
                  content: e.target.value,
                }))
              }
              value={messageUPdate.content || ""}
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
              <button className="btn btn-primary" onClick={handleSubmitUPdate}>
                {loadingUpdate ? (
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "تعديل"
                )}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOpenUpdate(false);
                  setErrorListUserUpdate("");
                  setIdUpdatePaypal("");
                }}
              >
                الغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
