import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ContextUser = createContext();

function ContextProvider({ children }) {
  const [openAuth, setOpenAuth] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertStore, setOpenAlertStore] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [checkConfition, setCheckConfition] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("roleUserLogin"));
  const [searchGlobal, setSearchGlobal] = useState();
  const [messageAndPaypal, setMessageAndPaypal] = useState([]);
  const [openSubscrips, setOpenSubscrips] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [allBackground, setAllBackground] = useState([]);
  //////////////////////////////all user////////////////////
  ////////////////////////////////////////////////////

  async function getBackground() {
    await axios
      .get("https://syrianrevolution1.com/background")
      .then((result) => setAllBackground(result?.data?.data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getBackground();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("messageOpen")) {
      if (messageAndPaypal.length > 0) {
        if (
          messageAndPaypal.filter((e) => e.category === "message")[0]
            ?.content !== localStorage.getItem("messageOpen")
        ) {
          setOpenOne(true);

          localStorage.setItem(
            "messageOpen",
            messageAndPaypal.filter((e) => e.category === "message")[0]?.content
          );
        }
      }
    } else {
      if (messageAndPaypal.length > 0) {
        localStorage.setItem(
          "messageOpen",
          messageAndPaypal.filter((e) => e.category === "message")[0]?.content
        );

        setOpenOne(true);
      }
    }
  }, [messageAndPaypal]);
  ///////////////////////////
  async function getSingleUser() {
    await axios
      .get(
        `https://syrianrevolution1.com/users/single/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        result?.data?.isConfident === true
          ? setCheckConfition(true)
          : setCheckConfition(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      async function getUserFirst() {
        await axios
          .get(
            `https://syrianrevolution1.com/users/single/${localStorage.getItem(
              "idUserLogin"
            )}`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((result) => {
            if (result?.data?._id) {
              localStorage.setItem("roleUserLogin", result?.data?.role);
              localStorage.setItem("selfImg", result?.data?.selfImg);
            } else {
              localStorage.clear();
            }
          })
          .catch((error) => console.log(error));
      }
      getUserFirst();
    }
  }, []);

  async function getAllMessageAndPaypal() {
    await axios
      .get("https://syrianrevolution1.com/messagePaypal")
      .then((result) => setMessageAndPaypal(result.data.data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getAllMessageAndPaypal();
  }, []);

  const [numberDate, setNumberDate] = useState("");
  const [notificationData, setNotificationData] = useState([]);
  async function getAllNotificationDate() {
    await axios
      .get(`https://syrianrevolution1.com/notifications?limit=10`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setNotificationData(result?.data?.data);
        setNumberDate(
          result?.data?.data?.filter((e) => e?.data?.isAccepted === true).length
        );
      })
      .catch((error) => console.log(error));
  }
  const [notification, setNontification] = useState([]);

  const [number, setNumber] = useState();
  async function getNotification() {
    axios
      .get(
        `https://syrianrevolution1.com/users/single/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        setNontification(result?.data);
        setNumber(
          1 +
            result?.data?.child?.length +
            result?.data?.lists?.length +
            result?.data?.massacres?.length
        );
      })
      .catch((error) => console.log(error));
  }
  /////////////////
  const [page, setPage] = useState(1);
  return (
    <ContextUser.Provider
      value={{
        openAuth,
        setOpenAuth,
        notification,
        getNotification,
        number,
        numberDate,
        notificationData,
        getAllNotificationDate,
        role,
        setRole,
        openAlert,
        setOpenAlert,
        openAlertStore,
        setOpenAlertStore,
        openLogout,
        setOpenLogout,
        getSingleUser,
        checkConfition,
        searchGlobal,
        setSearchGlobal,
        messageAndPaypal,
        getAllMessageAndPaypal,
        openSubscrips,
        setOpenSubscrips,
        openOne,
        setOpenOne,
        allBackground,
        getBackground,
        page,
        setPage,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
}

function useUser() {
  const context = useContext(ContextUser);
  if (context === undefined) {
    throw new Error("proplem in context");
  }
  return context;
}
export { ContextProvider, ContextUser, useUser };
