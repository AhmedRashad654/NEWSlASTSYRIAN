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
  const [ searchGlobal, setSearchGlobal ] = useState();
  const [ messageAndPaypal, setMessageAndPaypal ] = useState( [] )
  const [ history, setHistory ] = useState( [] );
  const [ openSubscrips, setOpenSubscrips ] = useState( false )
  const [ openOne, setOpenOne ] = useState( false )
  const [ allBackground, setAllBackground ] = useState( [] )
//////////////////////////////all user////////////////////
  const [userDashboard, setUserDashboard] = useState([]);
  const [ onlyUser, setOnlyUSer ] = useState('0');
  const [ onlyAdmin, setOnlyAdmin ] = useState( '0' )
  const [onlySupervisor, setOnlySupervisor] = useState("0");

  async function getAllUserDashboard() {
    try {
      const response = await fetch("https://syrianrevolution1.com/users/all", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      setOnlyUSer( result.data.filter( ( e ) => e.role === "user" )?.length );
      setOnlySupervisor(result.data.filter((e) => e.role === "supervisor")?.length);
      setOnlyAdmin(result.data.filter((e) => e.role === "admin")?.length);
      setUserDashboard(result.data);
   
    } catch (error) {
      console.error(error);
    }
  }
  ////////////////////////////////////////////////////

  async function getBackground() {
    await axios
      .get("https://syrianrevolution1.com/background")
      .then((result) => setAllBackground(result?.data?.data))
      .catch((error) => console.log(error));
  }
  useEffect( () => {
    getBackground()
  },[])
  useEffect( () => {
    if ( localStorage.getItem( 'messageOpen' ) ) {
      if ( messageAndPaypal.length > 0 ) {
            if (
              messageAndPaypal.filter((e) => e.category === "message")[0]
                ?.content !== localStorage.getItem("messageOpen")
            ) {
              setTimeout(() => {
                setOpenOne(true);
              }, [ 5000 ] );
              localStorage.setItem(
                "messageOpen",
                messageAndPaypal.filter((e) => e.category === "message")[0]
                  ?.content
              );
            }
      }
  
    } else {
      if ( messageAndPaypal.length > 0 ) {
           localStorage.setItem(
             "messageOpen",
             messageAndPaypal.filter((e) => e.category === "message")[0]
               ?.content
           );
        setTimeout( () => {
           setOpenOne(true);
        },[5000])
            
        
      }
   
     
    }
  
  }, [ messageAndPaypal ] )
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
      .then( ( result ) => {
      
        result?.data?.isConfident === true
          ? setCheckConfition(true)
          : setCheckConfition(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect( () => {
    if ( localStorage.getItem( 'token' ) ) {
      async function getUserFirst(){
          await axios.get(
            `https://syrianrevolution1.com/users/single/${localStorage.getItem(
              "idUserLogin"
            )}`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          ).then( ( result ) => {
     
            if ( result?.data?._id ) {
              localStorage.setItem( "roleUserLogin", result?.data?.role );
              localStorage.setItem( "selfImg", result?.data?.selfImg );
            }
            else {
              localStorage.clear()
            }
          }
            ).catch((error)=>console.log(error));
      }
    getUserFirst()
    }
  },[])

  const [lastNews, setLastNews] = useState([]);
  async function getListUser() {
    await axios
      .get("https://syrianrevolution1.com/lists/userView")
      .then((result) => {
        setLastNews(result.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getListUser();
  }, []);

  const [child, setChild] = useState([]);
  async function getChildUser() {
    await axios
      .get("https://syrianrevolution1.com/childData/userView")
      .then((result) => {
        setChild(result.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getChildUser();
  }, []);

  const [masc, setMasc] = useState([]);
  async function getMascersUser() {
    axios
      .get("https://syrianrevolution1.com/massacres/userView")
      .then((result) => {
        setMasc(result.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getMascersUser();
  }, []);
  //////////////////////////////////
    const [mascDash, setMascDash] = useState([]);
    async function getMascersDash() {
      axios
        .get("https://syrianrevolution1.com/massacres/userView")
        .then((result) => {
          setMascDash(result.data.data);
        })
        .catch((error) => console.log(error));
    }
    useEffect(() => {
      getMascersDash();
    }, []);
  const [childDash, setChildDash] = useState([]);
  async function getMartyr() {
    await axios
      .get("https://syrianrevolution1.com/childData")
      .then( ( result ) => {
         setChildDash(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getMartyr();
  }, []);

  const [listDash, setListDash] = useState([]);
  async function getList() {
    await axios
      .get("https://syrianrevolution1.com/lists")
      .then((result) => setListDash(result.data.data))
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getList();
  }, []);

  async function getAllMessageAndPaypal() {
    await axios
      .get("https://syrianrevolution1.com/messagePaypal")
      .then((result) => setMessageAndPaypal(result.data.data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getAllMessageAndPaypal();
  }, [] );

   async function getAllHistory() {
     await axios
       .get("https://syrianrevolution1.com/sgel", {
         headers: {
           Authorization: localStorage.getItem("token"),
         },
       })
       .then((result) => {
         setHistory(result.data.data);
       })
       .catch((error) => console.log(error));
   }
    useEffect(() => {
      getAllHistory();
    }, [] );

  const [ numberDate, setNumberDate ] = useState( "" );
  const [notificationData, setNotificationData] = useState([]);
    async function getAllNotificationDate() {
      await axios
        .get(`https://syrianrevolution1.com/notifications`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          setNotificationData(result?.data?.data);
          setNumberDate(
            result?.data?.data?.filter((e) => e?.data?.isAccepted === true)
              .length
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
        lastNews,
        child,
        masc,
        childDash,
        listDash,
        getMartyr,
        getList,
        getListUser,
        getChildUser,
        getMascersUser,
        searchGlobal,
        setSearchGlobal,
        messageAndPaypal,
        getAllMessageAndPaypal,
        history,
        openSubscrips,
        setOpenSubscrips,
        openOne,
        setOpenOne,
        allBackground,
        getBackground,
        getAllHistory,
        userDashboard,
        onlyUser,
        onlyAdmin,
        onlySupervisor,
        getAllUserDashboard,
        mascDash,
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
